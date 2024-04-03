import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSprApproverSettingInput } from './dto/create-spr-approver-setting.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { UpdateSprApproverSettingInput } from './dto/update-spr-approver-setting.input';
import { ApproverSettingRemoveResponse, SystemRemoveResponse } from '../__common__/classes';
import { Prisma, SPRApproverSetting } from 'apps/system/prisma/generated/client';
import { AuthUser } from '../__common__/auth-user.entity';
import { UpdateSprSettingOrderResponse } from './entities/update-spr-setting-order-response.entity';

@Injectable()
export class SprApproverSettingService {

  private readonly logger = new Logger(SprApproverSettingService.name);
  private authUser: AuthUser

  constructor(private readonly prisma: PrismaService) { }

  setAuthUser(authUser: AuthUser) {
    this.authUser = authUser
  }

  async create(input: CreateSprApproverSettingInput): Promise<SPRApproverSetting> {

    const approvers = await this.findAll()
    const totalApprovers = approvers.length
    const order = totalApprovers === 0 ? 2 : input.order

    const data: Prisma.SPRApproverSettingCreateInput = {
      approver: { connect: { id: input.approver_id } },
      label: input.label,
      order,
      created_by: this.authUser.user.username
    }

    const created = await this.prisma.sPRApproverSetting.create({
      data,
      include: {
        approver: true
      }
    })

    this.logger.log('Successfully created sPRApproverSetting')

    return created
  }

  async findAll(): Promise<SPRApproverSetting[]> {
    return await this.prisma.sPRApproverSetting.findMany({
      include: {
        approver: true
      },
      orderBy: {
        order: 'asc'
      }
    })
  }

  async findOne(id: string): Promise<SPRApproverSetting | null> {
    const item = await this.prisma.sPRApproverSetting.findUnique({
      include: {
        approver: true
      },
      where: { id }
    })

    if (!item) {
      throw new NotFoundException('sPRApproverSetting not found')
    }

    return item
  }

  async update(id: string, input: UpdateSprApproverSettingInput): Promise<SPRApproverSetting> {

    const existingItem = await this.findOne(id)

    const data: Prisma.SPRApproverSettingUpdateInput = {
      approver: input.approver_id ? { connect: { id: input.approver_id } } : { connect: { id: existingItem.approver_id } },
      label: input.label ?? existingItem.label,
      order: input.order ?? existingItem.order,
      updated_by: this.authUser.user.username
    }

    const updated = await this.prisma.sPRApproverSetting.update({
      data,
      where: {
        id
      },
      include: {
        approver: true
      }
    })

    this.logger.log('Successfully updated sPRApproverSetting')

    return updated
  }

  // after removing the order is altered. Needs to reorder accordingly
  async remove(id: string): Promise<ApproverSettingRemoveResponse> {

    const existingItem = await this.findOne(id)

    const queries = []

    // need to set first approver orders to negative unique values since order column has unique constraint
    const setTemporaryApproverOrdersQueries = await this.getQueries_for_setTemporaryApproverOrders()

    queries.push(...setTemporaryApproverOrdersQueries)

    // update approver orders 
    const reOrderApproversQueries = await this.getQueries_for_reOrderApprovers(id)

    queries.push(...reOrderApproversQueries)

    const removeApproverQuery = this.prisma.sPRApproverSetting.delete({
      where: { id }
    })

    queries.push(removeApproverQuery)

    const result = await this.prisma.$transaction(queries)

    console.log('result', result)

    const approvers = await this.findAll()

    return {
      success: true,
      msg: "sPRApproverSetting successfully deleted",
      // @ts-ignore
      approvers
    }

  }

  // need to set first approver orders to negative unique values since order column has unique constraint
  async updateManyOrders(inputs: { id: string; order: number }[]): Promise<UpdateSprSettingOrderResponse> {
    try {

      const queries = []

      const setTemporaryApproverOrdersQueries = await this.getQueries_for_setTemporaryApproverOrders()

      queries.push(...setTemporaryApproverOrdersQueries)

      for (let input of inputs) {

        // increment order since default order 1 is the immediate supervisor
        const order = input.order + 1

        const updateQuery = this.prisma.sPRApproverSetting.update({
          where: { id: input.id },
          data: { order },
          select: {
            id: true
          }
        })

        queries.push(updateQuery)

      }

      const result = await this.prisma.$transaction(queries)

      console.log('result', result)

      const approvers = await this.findAll()

      return {
        success: true,
        approvers: approvers
      };
    } catch (error) {
      this.logger.error(error);
      return { success: false, approvers: [] };
    }
  }

  private async getQueries_for_setTemporaryApproverOrders(): Promise<string[]> {
    console.log('setTemporaryApproverOrders')

    const approvers = await this.findAll()

    const queries = []

    let order = -1

    for (let approver of approvers) {

      console.log('order', order)

      const query = this.prisma.sPRApproverSetting.update({
        where: { id: approver.id },
        data: {
          order: order--
        }
      })

      queries.push(query)

    }

    return queries

  }

  /* 
    To reorder the order field in the approvers array so that it is incrementing without skipping numbers, 
      you can sort the array based on the order field and then update the order values sequentially.

    Starting order is 2 since order 1 will be the immediate supervisor 
  */
  private async getQueries_for_reOrderApprovers(idRemoved: string): Promise<string[]> {

    console.log('getQueries_for_reOrderApprovers()', idRemoved)

    const queries = []

    const approvers = await this.prisma.sPRApproverSetting.findMany({
      where: {
        id: {
          not: idRemoved
        }
      }
    })

    approvers.sort((a, b) => a.order - b.order);

    let currentOrder = 2;

    approvers.forEach((app) => {
      app.order = currentOrder;
      currentOrder++;
    });

    for (let approver of approvers) {

      const query = this.prisma.sPRApproverSetting.update({
        where: { id: approver.id },
        data: {
          order: approver.order
        }
      })

      queries.push(query)

    }

    return queries

  }

}
