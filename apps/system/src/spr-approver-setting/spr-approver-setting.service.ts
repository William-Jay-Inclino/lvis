import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSprApproverSettingInput } from './dto/create-spr-approver-setting.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { UpdateSprApproverSettingInput } from './dto/update-spr-approver-setting.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { Prisma, SPRApproverSetting } from 'apps/system/prisma/generated/client';
import { AuthUser } from '../__common__/auth-user.entity';

@Injectable()
export class SprApproverSettingService {

  private readonly logger = new Logger(SprApproverSettingService.name);
  private authUser: AuthUser

  constructor(private readonly prisma: PrismaService) { }

  setAuthUser(authUser: AuthUser) {
    this.authUser = authUser
  }

  async create(input: CreateSprApproverSettingInput): Promise<SPRApproverSetting> {

    const data: Prisma.SPRApproverSettingCreateInput = {
      approver: { connect: { id: input.approver_id } },
      label: input.label,
      order: input.order,
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
      where: {
        deleted_at: null
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

  async remove(id: string): Promise<SystemRemoveResponse> {

    const existingItem = await this.findOne(id)

    await this.prisma.sPRApproverSetting.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        deleted_by: this.authUser.user.username
      }
    })

    return {
      success: true,
      msg: "sPRApproverSetting successfully deleted"
    }

  }

}
