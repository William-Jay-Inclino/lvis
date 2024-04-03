import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMeqsApproverSettingInput } from './dto/create-meqs-approver-setting.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { UpdateMeqsApproverSettingInput } from './dto/update-meqs-approver-setting.input';
import { ApproverSettingRemoveResponse, SystemRemoveResponse } from '../__common__/classes';
import { Prisma, MEQSApproverSetting } from 'apps/system/prisma/generated/client';
import { AuthUser } from '../__common__/auth-user.entity';
import { UpdateMeqsSettingOrderResponse } from './entities/update-meqs-setting-order-response.entity';

@Injectable()
export class MeqsApproverSettingService {

	private readonly logger = new Logger(MeqsApproverSettingService.name);
	private authUser: AuthUser

	constructor(private readonly prisma: PrismaService) { }

	setAuthUser(authUser: AuthUser) {
		this.authUser = authUser
	}

	async create(input: CreateMeqsApproverSettingInput): Promise<MEQSApproverSetting> {

		const approvers = await this.findAll()
		const totalApprovers = approvers.length
		const order = totalApprovers === 0 ? 1 : input.order

		const data: Prisma.MEQSApproverSettingCreateInput = {
			approver: { connect: { id: input.approver_id } },
			label: input.label,
			order,
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

		const removeApproverQuery = this.prisma.mEQSApproverSetting.delete({
			where: { id }
		})

		queries.push(removeApproverQuery)

		const result = await this.prisma.$transaction(queries)

		console.log('result', result)

		const approvers = await this.findAll()

		return {
			success: true,
			msg: "mEQSApproverSetting successfully deleted",
			// @ts-ignore
			approvers
		}

	}

	// need to set first approver orders to negative unique values since order column has unique constraint
	async updateManyOrders(inputs: { id: string; order: number }[]): Promise<UpdateMeqsSettingOrderResponse> {
		try {

			const queries = []

			const setTemporaryApproverOrdersQueries = await this.getQueries_for_setTemporaryApproverOrders()

			queries.push(...setTemporaryApproverOrdersQueries)

			for (let input of inputs) {

				const updateQuery = this.prisma.mEQSApproverSetting.update({
					where: { id: input.id },
					data: { order: input.order },
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

			const query = this.prisma.mEQSApproverSetting.update({
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

	*/
	private async getQueries_for_reOrderApprovers(idRemoved: string): Promise<string[]> {

		console.log('getQueries_for_reOrderApprovers()', idRemoved)

		const queries = []

		const approvers = await this.prisma.mEQSApproverSetting.findMany({
			where: {
				id: {
					not: idRemoved
				}
			}
		})

		approvers.sort((a, b) => a.order - b.order);

		let currentOrder = 1;

		approvers.forEach((app) => {
			app.order = currentOrder;
			currentOrder++;
		});

		for (let approver of approvers) {

			const query = this.prisma.mEQSApproverSetting.update({
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
