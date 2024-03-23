import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRvApproverSettingInput } from './dto/create-rv-approver-setting.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { UpdateRvApproverSettingInput } from './dto/update-rv-approver-setting.input';
import { ApproverSettingRemoveResponse, SystemRemoveResponse } from '../__common__/classes';
import { Prisma, RVApproverSetting } from 'apps/system/prisma/generated/client';
import { AuthUser } from '../__common__/auth-user.entity';
import { UpdateRvSettingOrderResponse } from './entities/update-rv-setting-order-response.entity';

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

		const removeApproverQuery = this.prisma.rVApproverSetting.delete({
			where: { id }
		})

		queries.push(removeApproverQuery)

		const result = await this.prisma.$transaction(queries)

		console.log('result', result)

		const approvers = await this.findAll()

		return {
			success: true,
			msg: "rVApproverSetting successfully deleted",
			// @ts-ignore
			approvers
		}

	}

	// need to set first approver orders to negative unique values since order column has unique constraint
	async updateManyOrders(inputs: { id: string; order: number }[]): Promise<UpdateRvSettingOrderResponse> {
		try {

			const queries = []

			const setTemporaryApproverOrdersQueries = await this.getQueries_for_setTemporaryApproverOrders()

			queries.push(...setTemporaryApproverOrdersQueries)

			for (let input of inputs) {

				// increment order since default order 1 is the immediate supervisor
				const order = input.order + 1

				const updateQuery = this.prisma.rVApproverSetting.update({
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

			const query = this.prisma.rVApproverSetting.update({
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

		const approvers = await this.prisma.rVApproverSetting.findMany({
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

			const query = this.prisma.rVApproverSetting.update({
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
