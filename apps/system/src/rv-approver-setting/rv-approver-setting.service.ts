import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRvApproverSettingInput } from './dto/create-rv-approver-setting.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { UpdateRvApproverSettingInput } from './dto/update-rv-approver-setting.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { Prisma, RVApproverSetting } from 'apps/system/prisma/generated/client';
import { AuthUser } from '../__common__/auth-user.entity';

@Injectable()
export class RvApproverSettingService {

	private readonly logger = new Logger(RvApproverSettingService.name);
	private authUser: AuthUser

	constructor(private readonly prisma: PrismaService) { }

	setAuthUser(authUser: AuthUser) {
		this.authUser = authUser
	}

	async create(input: CreateRvApproverSettingInput): Promise<RVApproverSetting> {

		const data: Prisma.RVApproverSettingCreateInput = {
			approver: { connect: { id: input.approver_id } },
			label: input.label,
			order: input.order,
			created_by: this.authUser.user.username
		}

		const created = await this.prisma.rVApproverSetting.create({
			data,
			include: {
				approver: true
			}
		})

		this.logger.log('Successfully created rVApproverSetting')

		return created
	}

	async findAll(): Promise<RVApproverSetting[]> {
		return await this.prisma.rVApproverSetting.findMany({
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

	async findOne(id: string): Promise<RVApproverSetting | null> {
		const item = await this.prisma.rVApproverSetting.findUnique({
			include: {
				approver: true
			},
			where: { id }
		})

		if (!item) {
			throw new NotFoundException('rVApproverSetting not found')
		}

		return item
	}

	async update(id: string, input: UpdateRvApproverSettingInput): Promise<RVApproverSetting> {

		const existingItem = await this.findOne(id)

		const data: Prisma.RVApproverSettingUpdateInput = {
			approver: input.approver_id ? { connect: { id: input.approver_id } } : { connect: { id: existingItem.approver_id } },
			label: input.label ?? existingItem.label,
			order: input.order ?? existingItem.order,
			updated_by: this.authUser.user.username
		}

		const updated = await this.prisma.rVApproverSetting.update({
			data,
			where: {
				id
			},
			include: {
				approver: true
			}
		})

		this.logger.log('Successfully updated rVApproverSetting')

		return updated
	}

	async remove(id: string): Promise<SystemRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.rVApproverSetting.update({
			where: { id },
			data: {
				deleted_at: new Date(),
				deleted_by: this.authUser.user.username
			}
		})

		return {
			success: true,
			msg: "rVApproverSetting successfully deleted"
		}

	}

}
