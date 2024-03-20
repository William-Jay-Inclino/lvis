import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMeqsApproverSettingInput } from './dto/create-meqs-approver-setting.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { UpdateMeqsApproverSettingInput } from './dto/update-meqs-approver-setting.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { Prisma, MEQSApproverSetting } from 'apps/system/prisma/generated/client';
import { AuthUser } from '../__common__/auth-user.entity';

@Injectable()
export class MeqsApproverSettingService {

	private readonly logger = new Logger(MeqsApproverSettingService.name);
	private authUser: AuthUser

	constructor(private readonly prisma: PrismaService) { }

	setAuthUser(authUser: AuthUser) {
		this.authUser = authUser
	}

	async create(input: CreateMeqsApproverSettingInput): Promise<MEQSApproverSetting> {

		const data: Prisma.MEQSApproverSettingCreateInput = {
			approver: { connect: { id: input.approver_id } },
			label: input.label,
			order: input.order,
			created_by: this.authUser.user.username
		}

		const created = await this.prisma.mEQSApproverSetting.create({
			data,
			include: {
				approver: true
			}
		})

		this.logger.log('Successfully created mEQSApproverSetting')

		return created
	}

	async findAll(): Promise<MEQSApproverSetting[]> {
		return await this.prisma.mEQSApproverSetting.findMany({
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

	async findOne(id: string): Promise<MEQSApproverSetting | null> {
		const item = await this.prisma.mEQSApproverSetting.findUnique({
			include: {
				approver: true
			},
			where: { id }
		})

		if (!item) {
			throw new NotFoundException('mEQSApproverSetting not found')
		}

		return item
	}

	async update(id: string, input: UpdateMeqsApproverSettingInput): Promise<MEQSApproverSetting> {

		const existingItem = await this.findOne(id)

		const data: Prisma.MEQSApproverSettingUpdateInput = {
			approver: input.approver_id ? { connect: { id: input.approver_id } } : { connect: { id: existingItem.approver_id } },
			label: input.label ?? existingItem.label,
			order: input.order ?? existingItem.order,
			updated_by: this.authUser.user.username
		}

		const updated = await this.prisma.mEQSApproverSetting.update({
			data,
			where: {
				id
			},
			include: {
				approver: true
			}
		})

		this.logger.log('Successfully updated mEQSApproverSetting')

		return updated
	}

	async remove(id: string): Promise<SystemRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.mEQSApproverSetting.update({
			where: { id },
			data: {
				deleted_at: new Date(),
				deleted_by: this.authUser.user.username
			}
		})

		return {
			success: true,
			msg: "mEQSApproverSetting successfully deleted"
		}

	}

}
