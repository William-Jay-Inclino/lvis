import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSprApproverInput } from './dto/create-spr-approver.input';
import { UpdateSprApproverInput } from './dto/update-spr-approver.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, SPRApprover } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS } from '../__common__/types';
import { AuthUser } from '../__common__/auth-user.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { isAdmin, isValidApprovalStatus } from '../__common__/helpers';
import { UpdateSPROrderResponse } from './entities/update-spr-order-response.entity';

@Injectable()
export class SprApproverService {

  private readonly logger = new Logger(SprApproverService.name);
  private authUser: AuthUser
  private includedFields = {
    spr: {
      include: {
        canvass: {
          include: {
            canvass_items: {
              include: {
                unit: true,
                brand: true
              }
            }
          }
        }
      }
    }
  }

  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) { }

  setAuthUser(authUser: AuthUser) {
    this.authUser = authUser
  }

  async create(input: CreateSprApproverInput): Promise<SPRApprover> {

    const employeeIds = []

    employeeIds.push(input.approver_id)

    if (employeeIds.length > 0) {
      const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)

      if (!isValidEmployeeIds) {
        throw new BadRequestException("One or more employee id is invalid")
      }
    }

    const data: Prisma.SPRApproverCreateInput = {
      spr: { connect: { id: input.spr_id } },
      approver_id: input.approver_id,
      label: input.label,
      order: input.order,
      notes: '',
      status: APPROVAL_STATUS.PENDING,
      is_supervisor: input.is_supervisor ? input.is_supervisor : false,
      created_by: this.authUser.user.username
    }

    const created = await this.prisma.sPRApprover.create({
      data,
      include: this.includedFields
    })

    this.logger.log('Successfully created sPRApprover')

    return created
  }

  findOne(id: string): Promise<SPRApprover | null> {

    const item = this.prisma.sPRApprover.findUnique({
      where: { id },
      include: this.includedFields
    })

    if (!item) {
      throw new NotFoundException('SPR Approver not found')
    }

    return item

  }

  async findBySprId(sprId: string): Promise<SPRApprover[]> {

    this.logger.log('findBySprId()', sprId)

    if (!sprId) {
      throw new BadRequestException('sprId is undefined')
    }

    return await this.prisma.sPRApprover.findMany({
      // include: this.includedFields,
      where: {
        deleted_at: null,
        spr_id: sprId
      },
      orderBy: {
        order: 'asc'
      }
    })
  }

  async findBySprNumber(sprNumber: string): Promise<SPRApprover[]> {
    return await this.prisma.sPRApprover.findMany({
      include: this.includedFields,
      where: {
        deleted_at: null,
        spr: {
          spr_number: sprNumber
        }
      },
      orderBy: {
        order: 'asc'
      }
    })
  }

  async update(id: string, input: UpdateSprApproverInput): Promise<SPRApprover> {
    this.logger.log('update()')


    const existingItem = await this.prisma.sPRApprover.findUnique({
      where: { id },
      include: {
          spr: true
      }
  })

    console.log('existingItem', existingItem)
    console.log('this.authUser.user.user_employee', this.authUser.user.user_employee)

    let isApprover = false

    if (this.authUser.user.user_employee && this.authUser.user.user_employee.employee) {
      isApprover = this.authUser.user.user_employee.employee.id === existingItem.approver_id
    }

    console.log('isApprover', isApprover)

    if (!isAdmin(this.authUser) && !isApprover) {
      throw new ForbiddenException('Only Admin and Approver can update')
    }

    await this.validateInput(input)

    let dateApproval = isAdmin(this.authUser) ? (input.date_approval ? new Date(input.date_approval) : new Date()) : new Date()

    if (input.status && input.status === APPROVAL_STATUS.PENDING) {
      dateApproval = null
    } else if (!dateApproval) {
      dateApproval = existingItem.date_approval
    }

    const data: Prisma.SPRApproverUpdateInput = {
      approver_id: input.approver_id ?? existingItem.approver_id,
      date_approval: dateApproval,
      notes: input.notes ?? existingItem.notes,
      status: input.status ?? existingItem.status,
      label: input.label ?? existingItem.label,
      order: input.order ?? existingItem.order,
      is_supervisor: input.is_supervisor ?? existingItem.is_supervisor,
      updated_by: this.authUser.user.username
    }

    const queries = []

    const updateSprApproverQuery = this.prisma.sPRApprover.update({
        data,
        where: { id },
        include: this.includedFields,
    });

    queries.push(updateSprApproverQuery)

    // if approver is updated
    if(input.approver_id) {

        const isNewApprover = input.approver_id !== existingItem.approver_id

        // update supervisor in rv table as well
        if(existingItem.is_supervisor && isNewApprover) {

            console.log('updating spr supervisor');
            const updateSprSupervisorQuery = this.prisma.sPR.update({
                data: {
                    supervisor_id: input.approver_id
                },
                where: {
                    id: existingItem.spr.id
                }
            })

            queries.push(updateSprSupervisorQuery)
        }

    }

    const result = await this.prisma.$transaction(queries)

    this.logger.log('Successfully updated SPR Approver');

    return result[0]

    // const updated = await this.prisma.sPRApprover.update({
    //   data,
    //   where: { id },
    //   include: this.includedFields,
    // });
    // this.logger.log('Successfully updated SPR Approver');
    // return updated;

  }

  async remove(id: string): Promise<WarehouseRemoveResponse> {

    const existingItem = await this.findOne(id)

    await this.prisma.sPRApprover.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        deleted_by: this.authUser.user.username
      }
    })

    return {
      success: true,
      msg: "SPR Approver successfully deleted"
    }

  }

  async updateManyOrders(inputs: { id: string; order: number }[]): Promise<UpdateSPROrderResponse> {
    try {

      const queries = []

      for (let input of inputs) {

        const updateQuery = this.prisma.sPRApprover.update({
          where: { id: input.id },
          data: { order: input.order },
          select: {
            spr_id: true
          }
        })

        queries.push(updateQuery)

      }

      const result = await this.prisma.$transaction(queries)

      const spr = result[0] as SPRApprover

      console.log('spr', spr)

      const approvers = await this.findBySprId(spr.spr_id)

      return {
        success: true,
        approvers: approvers
      };
    } catch (error) {
      this.logger.error(error);
      return { success: false, approvers: [] };
    }
  }

  async forEmployeePendingApprovals(employeeId: string): Promise<SPRApprover[]> {
    return await this.prisma.sPRApprover.findMany({
      where: {
        approver_id: employeeId,
        status: APPROVAL_STATUS.PENDING,
        deleted_at: null,
        spr: {
          cancelled_at: null
        }
      },
      orderBy: {
        created_at: 'asc'
      },
      include: {
        spr: {
          include: {
            spr_approvers: {
              where: {
                deleted_at: null
              },
              orderBy: {
                order: 'asc'
              }
            }
          }
        }
      }
    })
  }

  private async areEmployeesExist(employeeIds: string[], authUser: AuthUser): Promise<boolean> {

    this.logger.log('areEmployeesExist', employeeIds);

    const query = `
            query {
                validateEmployeeIds(ids: ${JSON.stringify(employeeIds)})
            }
        `;

    console.log('query', query)
    console.log('authUser', authUser)

    try {
      const { data } = await firstValueFrom(
        this.httpService.post(
          process.env.API_GATEWAY_URL,
          { query },
          {
            headers: {
              Authorization: authUser.authorization,
              'Content-Type': 'application/json',
            },
          }
        ).pipe(
          catchError((error) => {
            throw error;
          }),
        ),
      );

      console.log('data', data);
      console.log('data.data.validateEmployeeIds', data.data.validateEmployeeIds)

      if (!data || !data.data) {
        console.log('No data returned');
        return false;
      }

      return data.data.validateEmployeeIds;

    } catch (error) {
      console.error('Error querying employees:', error.message);
      return false;
    }
  }

  private async validateInput(input: UpdateSprApproverInput): Promise<void> {
    if (input.status && !isValidApprovalStatus(input.status)) {
      throw new BadRequestException('Invalid status value');
    }

    if (input.status && input.status === APPROVAL_STATUS.CANCELLED) {
      throw new BadRequestException('Cancelled status not allowed');
    }

    const employeeIds = []

    if (input.approver_id) {
      employeeIds.push(input.approver_id)
    }

    console.log('employeeIds', employeeIds)
    if (employeeIds.length > 0) {
      const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)

      if (!isValidEmployeeIds) {
        throw new BadRequestException("One or more employee id is invalid")
      }
    }
  }

}
