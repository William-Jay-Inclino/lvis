import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRrApproverSettingInput } from './dto/create-rr-approver-setting.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { UpdateRrApproverSettingInput } from './dto/update-rr-approver-setting.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { Prisma, RRApproverSetting } from 'apps/system/prisma/generated/client';
import { AuthUser } from '../__common__/auth-user.entity';

@Injectable()
export class RrApproverSettingService {

	private readonly logger = new Logger(RrApproverSettingService.name);
	private authUser: AuthUser

	constructor(private readonly prisma: PrismaService) { }

	setAuthUser(authUser: AuthUser) {
		this.authUser = authUser
	}

	async create(input: CreateRrApproverSettingInput): Promise<RRApproverSetting> {

		const data: Prisma.RRApproverSettingCreateInput = {
			approver: { connect: { id: input.approver_id } },
			label: input.label,
			order: input.order,
			created_by: this.authUser.user.username
		}

		const created = await this.prisma.rRApproverSetting.create({
			data,
			include: {
				approver: true
			}
		})

		this.logger.log('Successfully created rRApproverSetting')

		return created
	}

	async findAll(): Promise<RRApproverSetting[]> {
		return await this.prisma.rRApproverSetting.findMany({
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

	async findOne(id: string): Promise<RRApproverSetting | null> {
		const item = await this.prisma.rRApproverSetting.findUnique({
			include: {
				approver: true
			},
			where: { id }
		})

		if (!item) {
			throw new NotFoundException('rRApproverSetting not found')
		}

		return item
	}

	async update(id: string, input: UpdateRrApproverSettingInput): Promise<RRApproverSetting> {

		const existingItem = await this.findOne(id)

		const data: Prisma.RRApproverSettingUpdateInput = {
			approver: input.approver_id ? { connect: { id: input.approver_id } } : { connect: { id: existingItem.approver_id } },
			label: input.label ?? existingItem.label,
			order: input.order ?? existingItem.order,
			updated_by: this.authUser.user.username
		}

		const updated = await this.prisma.rRApproverSetting.update({
			data,
			where: {
				id
			},
			include: {
				approver: true
			}
		})

		this.logger.log('Successfully updated rRApproverSetting')

		return updated
	}

	async remove(id: string): Promise<SystemRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.rRApproverSetting.update({
			where: { id },
			data: {
				deleted_at: new Date(),
				deleted_by: this.authUser.user.username
			}
		})

		return {
			success: true,
			msg: "rRApproverSetting successfully deleted"
		}

	}

}
