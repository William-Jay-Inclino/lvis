import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePoApproverSettingInput } from './dto/create-po-approver-setting.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { UpdatePoApproverSettingInput } from './dto/update-po-approver-setting.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { Prisma, POApproverSetting } from 'apps/system/prisma/generated/client';
import { AuthUser } from '../__common__/auth-user.entity';

@Injectable()
export class PoApproverSettingService {

	private readonly logger = new Logger(PoApproverSettingService.name);
	private authUser: AuthUser

	constructor(private readonly prisma: PrismaService) { }

	setAuthUser(authUser: AuthUser) {
		this.authUser = authUser
	}

	async create(input: CreatePoApproverSettingInput): Promise<POApproverSetting> {

		const data: Prisma.POApproverSettingCreateInput = {
			approver: { connect: { id: input.approver_id } },
			label: input.label,
			order: input.order,
			created_by: this.authUser.user.username
		}

		const created = await this.prisma.pOApproverSetting.create({
			data,
			include: {
				approver: true
			}
		})

		this.logger.log('Successfully created pOApproverSetting')

		return created
	}

	async findAll(): Promise<POApproverSetting[]> {
		return await this.prisma.pOApproverSetting.findMany({
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

	async findOne(id: string): Promise<POApproverSetting | null> {
		const item = await this.prisma.pOApproverSetting.findUnique({
			include: {
				approver: true
			},
			where: { id }
		})

		if (!item) {
			throw new NotFoundException('pOApproverSetting not found')
		}

		return item
	}

	async update(id: string, input: UpdatePoApproverSettingInput): Promise<POApproverSetting> {

		const existingItem = await this.findOne(id)

		const data: Prisma.POApproverSettingUpdateInput = {
			approver: input.approver_id ? { connect: { id: input.approver_id } } : { connect: { id: existingItem.approver_id } },
			label: input.label ?? existingItem.label,
			order: input.order ?? existingItem.order,
			updated_by: this.authUser.user.username
		}

		const updated = await this.prisma.pOApproverSetting.update({
			data,
			where: {
				id
			},
			include: {
				approver: true
			}
		})

		this.logger.log('Successfully updated pOApproverSetting')

		return updated
	}

	async remove(id: string): Promise<SystemRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.pOApproverSetting.update({
			where: { id },
			data: {
				deleted_at: new Date(),
				deleted_by: this.authUser.user.username
			}
		})

		return {
			success: true,
			msg: "pOApproverSetting successfully deleted"
		}

	}

}
