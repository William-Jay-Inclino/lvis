import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateJoApproverInput } from './dto/create-jo-approver.input';
import { UpdateJoApproverInput } from './dto/update-jo-approver.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, JOApprover } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS } from '../__common__/types';
import { AuthUser } from '../__common__/auth-user.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { isAdmin, isValidApprovalStatus } from '../__common__/helpers';
import { UpdateJOOrderResponse } from './entities/update-jo-order-response.entity';

@Injectable()
export class JoApproverService {

  private readonly logger = new Logger(JoApproverService.name);
  private authUser: AuthUser
  private includedFields = {
    jo: {
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

  async create(input: CreateJoApproverInput): Promise<JOApprover> {

    const employeeIds = []

    employeeIds.push(input.approver_id)

    if (employeeIds.length > 0) {
      const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)

      if (!isValidEmployeeIds) {
        throw new BadRequestException("One or more employee id is invalid")
      }
    }

    const data: Prisma.JOApproverCreateInput = {
      jo: { connect: { id: input.jo_id } },
      approver_id: input.approver_id,
      label: input.label,
      order: input.order,
      notes: '',
      status: APPROVAL_STATUS.PENDING,
      created_by: this.authUser.user.username
    }

    const created = await this.prisma.jOApprover.create({
      data,
      include: this.includedFields
    })

    this.logger.log('Successfully created jOApprover')

    return created
  }

  findOne(id: string): Promise<JOApprover | null> {

    const item = this.prisma.jOApprover.findUnique({
      where: { id },
      include: this.includedFields
    })

    if (!item) {
      throw new NotFoundException('JO Approver not found')
    }

    return item

  }

  async findByJoId(joId: string): Promise<JOApprover[]> {

    this.logger.log('findByJoId()', joId)

    if (!joId) {
      throw new BadRequestException('jo_id is undefined')
    }

    return await this.prisma.jOApprover.findMany({
      where: {
        deleted_at: null,
        jo_id: joId
      },
      orderBy: {
        order: 'asc'
      }
    })
  }

  async findByJoNumber(joNumber: string): Promise<JOApprover[]> {
    return await this.prisma.jOApprover.findMany({
      include: this.includedFields,
      where: {
        deleted_at: null,
        jo: {
          jo_number: joNumber
        }
      },
      orderBy: {
        order: 'asc'
      }
    })
  }

  async update(id: string, input: UpdateJoApproverInput): Promise<JOApprover> {
    this.logger.log('update()')


    const existingItem = await this.findOne(id)

    const isApprover = this.authUser.user.user_employee.id === existingItem.approver_id

    if (!isAdmin(this.authUser) && !isApprover) {
      throw new ForbiddenException('Only Admin and Approver can update')
    }

    await this.validateInput(input)

    let dateApproval = new Date(input.date_approval)

    if (input.status && input.status === APPROVAL_STATUS.PENDING) {
      dateApproval = null
    } else if (!dateApproval) {
      dateApproval = existingItem.date_approval
    }

    const data: Prisma.JOApproverUpdateInput = {
      approver_id: input.approver_id ?? existingItem.approver_id,
      date_approval: dateApproval,
      notes: input.notes ?? existingItem.notes,
      status: input.status ?? existingItem.status,
      label: input.label ?? existingItem.label,
      order: input.order ?? existingItem.order,
      updated_by: this.authUser.user.username
    }

    const updated = await this.prisma.jOApprover.update({
      data,
      where: { id },
      include: this.includedFields,
    });
    this.logger.log('Successfully updated JO Approver');
    return updated;

  }

  async remove(id: string): Promise<WarehouseRemoveResponse> {

    const existingItem = await this.findOne(id)

    await this.prisma.jOApprover.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        deleted_by: this.authUser.user.username
      }
    })

    return {
      success: true,
      msg: "JO Approver successfully deleted"
    }

  }

  async updateManyOrders(inputs: { id: string; order: number }[]): Promise<UpdateJOOrderResponse> {
    try {

      const queries = []

      for (let input of inputs) {

        const updateQuery = this.prisma.jOApprover.update({
          where: { id: input.id },
          data: { order: input.order },
          select: {
            jo_id: true
          }
        })

        queries.push(updateQuery)

      }

      const result = await this.prisma.$transaction(queries)

      const jo = result[0] as JOApprover

      console.log('jo', jo)

      const approvers = await this.findByJoId(jo.jo_id)

      return {
        success: true,
        approvers: approvers
      };
    } catch (error) {
      this.logger.error(error);
      return { success: false, approvers: [] };
    }
  }

  async forEmployeePendingApprovals(employeeId: string): Promise<JOApprover[]> {
    return await this.prisma.jOApprover.findMany({
      where: {
        approver_id: employeeId,
        status: APPROVAL_STATUS.PENDING,
        deleted_at: null
      },
      orderBy: {
        created_at: 'asc'
      },
      include: {
        jo: {
          include: {
            jo_approvers: {
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

  private async validateInput(input: UpdateJoApproverInput): Promise<void> {
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
