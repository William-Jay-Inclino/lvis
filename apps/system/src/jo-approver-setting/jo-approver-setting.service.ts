import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateJoApproverSettingInput } from './dto/create-jo-approver-setting.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { UpdateJoApproverSettingInput } from './dto/update-jo-approver-setting.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { JOApproverSetting, Prisma } from 'apps/system/prisma/generated/client';
import { AuthUser } from '../__common__/auth-user.entity';

@Injectable()
export class JoApproverSettingService {

  private readonly logger = new Logger(JoApproverSettingService.name);
  private authUser: AuthUser

  constructor(private readonly prisma: PrismaService) { }

  setAuthUser(authUser: AuthUser) {
    this.authUser = authUser
  }

  async create(input: CreateJoApproverSettingInput): Promise<JOApproverSetting> {

    const data: Prisma.JOApproverSettingCreateInput = {
      approver: { connect: { id: input.approver_id } },
      label: input.label,
      order: input.order,
      created_by: this.authUser.user.username
    }

    const created = await this.prisma.jOApproverSetting.create({
      data,
      include: {
        approver: true
      }
    })

    this.logger.log('Successfully created jOApproverSetting')

    return created
  }

  async findAll(): Promise<JOApproverSetting[]> {
    return await this.prisma.jOApproverSetting.findMany({
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

  async findOne(id: string): Promise<JOApproverSetting | null> {
    const item = await this.prisma.jOApproverSetting.findUnique({
      include: {
        approver: true
      },
      where: { id }
    })

    if (!item) {
      throw new NotFoundException('jOApproverSetting not found')
    }

    return item
  }

  async update(id: string, input: UpdateJoApproverSettingInput): Promise<JOApproverSetting> {

    const existingItem = await this.findOne(id)

    const data: Prisma.JOApproverSettingUpdateInput = {
      approver: input.approver_id ? { connect: { id: input.approver_id } } : { connect: { id: existingItem.approver_id } },
      label: input.label ?? existingItem.label,
      order: input.order ?? existingItem.order,
      updated_by: this.authUser.user.username
    }

    const updated = await this.prisma.jOApproverSetting.update({
      data,
      where: {
        id
      },
      include: {
        approver: true
      }
    })

    this.logger.log('Successfully updated jOApproverSetting')

    return updated
  }

  async remove(id: string): Promise<SystemRemoveResponse> {

    const existingItem = await this.findOne(id)

    await this.prisma.jOApproverSetting.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        deleted_by: this.authUser.user.username
      }
    })

    return {
      success: true,
      msg: "jOApproverSetting successfully deleted"
    }

  }

}
