import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Item, Prisma, RRApprover } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS, ITEM_TRANSACTION_TYPE } from '../__common__/types';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { ItemsResponse } from './entities/items-response.entity';
import { AuthUser } from '../__common__/auth-user.entity';
import { ItemTransaction } from './entities/item-transaction.entity';

@Injectable()
export class ItemService {

	private readonly logger = new Logger(ItemService.name);
	private authUser: AuthUser
	private includedFields = {
		item_type: true,
		unit: true
	}

	constructor(
		private readonly prisma: PrismaService
	) { }

	setAuthUser(authUser: AuthUser) {
		this.authUser = authUser
	}

	async create(input: CreateItemInput): Promise<Item> {

		this.logger.log('create()', input)


		const item_transaction: Prisma.ItemTransactionCreateWithoutItemInput = {
			type: ITEM_TRANSACTION_TYPE.STOCK_IN,
			quantity: input.initial_quantity,
			price: input.initial_average_price,
			remarks: 'Initial item transaction'
		}

		const createdBy = this.authUser.user.username

		const data: Prisma.ItemCreateInput = {
			item_type: {
				connect: { id: input.item_type_id }
			},
			unit: {
				connect: { id: input.unit_id }
			},
			code: input.code,
			name: input.name,
			description: input.description,
			initial_quantity: input.initial_quantity,
			total_quantity: input.initial_quantity,
			created_by: createdBy,
			item_transactions: {
				create: item_transaction
			}
		}

		const created = await this.prisma.item.create({
			data,
			include: this.includedFields
		})

		this.logger.log('Successfully created Item')

		return created

	}

	async findAll(page: number, pageSize: number, name?: string, item_type_id?: string): Promise<ItemsResponse> {

		const skip = (page - 1) * pageSize;

		let whereCondition: any = {
			deleted_at: null
		};

		if (name) {
			whereCondition = {
				name: { contains: name.trim(), mode: 'insensitive' },
			};
		}

		if (item_type_id) {
			whereCondition.item_type_id = {
				equals: item_type_id,
			};
		}

		const items = await this.prisma.item.findMany({
			include: this.includedFields,
			where: whereCondition,
			orderBy: {
				code: 'asc'
			},
			skip,
			take: pageSize
		})

		const totalItems = await this.prisma.item.count({
			where: whereCondition
		})

		return {
			data: items,
			totalItems,
			currentPage: page,
			totalPages: Math.ceil(totalItems / pageSize),
		};

	}

	async findOne(id: string): Promise<Item | undefined> {

		this.logger.log('fineOne()', id)

		const item = await this.prisma.item.findUnique({
			include: {
				item_transactions: {
					orderBy: {
						id: 'desc'
					},
					include: {
						rr_item: {
							include: {
								rr: true
							}
						}
					}
				},
				item_type: true,
				unit: true,
			},
			where: { id }
		})

		if (!item) {
			throw new NotFoundException('Item not found')
		}

		return item

	}

	async findByCode(code: string): Promise<Item> {

		this.logger.log('fineOne()', code)

		const item = await this.prisma.item.findUnique({
			include: {
				item_transactions: {
					orderBy: {
						id: 'desc'
					},
					include: {
						rr_item: {
							include: {
								rr: true
							}
						}
					}
				},
				item_type: true,
				unit: true,
			},
			where: { code }
		})

		if (!item) {
			throw new NotFoundException('Item not found')
		}

		return item

	}

	async update(id: string, input: UpdateItemInput): Promise<Item> {

		const existingItem = await this.findOne(id)

		const updatedBy = this.authUser.user.username

		const data: Prisma.ItemUpdateInput = {
			item_type: input.item_type_id ?
				{ connect: { id: input.item_type_id } }
				:
				{ connect: { id: existingItem.item_type_id } },
			unit: input.unit_id ?
				{ connect: { id: input.unit_id } }
				:
				{ connect: { id: existingItem.unit_id } },
			code: input.code ?? existingItem.code,
			name: input.name ?? existingItem.name,
			description: input.description ?? existingItem.description,
			updated_by: updatedBy
		}

		const updated = await this.prisma.item.update({
			data,
			include: this.includedFields,
			where: {
				id
			}
		})

		this.logger.log('Successfully updated item')

		return updated

	}

	async remove(id: string): Promise<WarehouseRemoveResponse> {
		const existingItem = await this.findOne(id)

		await this.prisma.item.update({
			where: { id },
			data: {
				deleted_at: new Date(),
				deleted_by: this.authUser.user.username
			}
		})

		return {
			success: true,
			msg: "Item successfully deleted"
		}
	}

	getGWAPrice(itemTransactions: ItemTransaction[]): number {

		const totalPrices = itemTransactions.reduce((total, item) => total + item.price, 0);
		const gwa = totalPrices / itemTransactions.length;

		return gwa

	}

	// private isRrStatusApproved(approvers: RRApprover[]): boolean {

	// 	for(let approver of approvers) {

	// 		if(approver.status !== APPROVAL_STATUS.APPROVED) {
	// 			return false 
	// 		}

	// 	}

	// 	return true

	// }

	// private async transactRrItems(rrId: string, rrItems: RRItem[]): Promise<{success: boolean}> {

	//     console.log('transactRrItems', rrItems)

	//     const queries = []

	//     // prepare query for item transaction
	//     const itemTransactions: Prisma.ItemTransactionCreateManyInput[] = []


	//     for(let rrItem of rrItems) {

	//         if(!rrItem.item_id) {
	//             continue
	//         }

	//         const data: Prisma.ItemTransactionCreateManyInput = {
	//             item_id: rrItem.item_id,
	//             rr_item_id: rrItem.id,
	//             type: ITEM_TRANSACTION_TYPE.STOCK_IN,
	//             quantity: rrItem.quantity_accepted,
	//             price: rrItem.gross_price,
	//             remarks: 'From RR'
	//         } 

	//         itemTransactions.push(data)

	//     }

	//     const createItemTransactionsQuery = this.prisma.itemTransaction.createMany({
	//         data: itemTransactions
	//     })

	//     queries.push(createItemTransactionsQuery)

	//     // prepare queries for updating item quantity based on item_transactions
	//     for(let transaction of itemTransactions) {

	//         const item = await this.prisma.item.findUnique({ where: { id: transaction.item_id } });
	//         if (!item) {
	//             throw new NotFoundException(`Item not found with item_id: ${transaction.item_id}`);
	//         }

	//         const totalQuantity = item.total_quantity + transaction.quantity;

	//         const updateItemQtyQuery = this.prisma.item.update({
	//             where: { id: item.id },
	//             data: { total_quantity: totalQuantity },
	//         });

	//         queries.push(updateItemQtyQuery)

	//     }


	//     // set is_completed field in rr table to true 
	//     const updateRRQuery = this.prisma.rR.update({
	//         where: {
	//             id: rrId
	//         },
	//         data: {
	//             is_completed: true
	//         }
	//     })
	//     queries.push(updateRRQuery)

	//     console.log('queries', queries)


	//     // EXECUTE QUERIES
	//     await this.prisma.$transaction(queries)

	//     return {
	//         success: true
	//     }

	// }

	// @OnEvent('rr-approver-status.updated')
	// async handleRrApproverStatusUpdated(payload: RrApproverStatusUpdated) {

	//     this.logger.log('=== item-transaction.service.ts ===')

	// 	console.log('handleRrApproverStatusUpdated()', payload)

	// 	const rrApprover = await this.prisma.rRApprover.findUnique({
	// 		where: { id: payload.id },
	// 		include: {
	// 			rr: {
	// 				include: {
	// 					rr_items: true,
	// 					rr_approvers: {
	//                         where: {
	//                             is_deleted: false
	//                         }
	//                     }
	// 				}
	// 			}
	// 		}
	// 	})

	// 	if(!rrApprover) {
	// 		throw new NotFoundException('rrApprover not found with id: ' + payload.id)
	// 	}

	// 	if(rrApprover.rr.is_completed) {
	// 		console.log('RR is already completed. End function')
	// 		return 
	// 	}

	// 	const approvers = rrApprover.rr.rr_approvers

	//     console.log('approvers', approvers)

	// 	const isApproved = this.isRrStatusApproved(approvers)

	// 	if(!isApproved) {
	// 		console.log('RR status is not approved. End function')
	// 		return 
	// 	}

	// 	console.log('Transacting RR items...')


	//     const hasItemToTransact = rrApprover.rr.rr_items.find(i => !!i.item_id)

	//     // if no items to transact just set the rr to complete
	//     if(!hasItemToTransact) {

	//         const updatedRR = await this.prisma.rR.update({
	//             select: {
	//                 is_completed: true
	//             },
	//             where: { id: rrApprover.rr_id },
	//             data: {
	//                 is_completed: true
	//             }
	//         })

	//         console.log('RR is_complete', updatedRR.is_completed)

	//         return 

	//     }   

	//     // add rr items to item_transaction table and update total quantity of item in the item table
	//     const response = await this.transactRrItems(rrApprover.rr_id, rrApprover.rr.rr_items)

	//     console.log('response', response)

	// }

}
