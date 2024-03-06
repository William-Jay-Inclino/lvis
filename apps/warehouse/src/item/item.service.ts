import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Item, Prisma, RRApprover } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS, ITEM_TRANSACTION_TYPE } from '../__common__/types';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { ItemsResponse } from './entities/items-response.entity';

@Injectable()
export class ItemService {

	private readonly logger = new Logger(ItemService.name);
	private includedFields = {
		item_transactions: true,
		item_type: true,
		unit: true,
		rr_items: true
	}

	constructor(
		private readonly prisma: PrismaService
	) {}

	async create(input: CreateItemInput): Promise<Item> {
		
		this.logger.log('create()', input)


		const item_transaction: Prisma.ItemTransactionCreateWithoutItemInput = {
			type: ITEM_TRANSACTION_TYPE.STOCK_IN,
			quantity: input.initial_quantity,
			price: input.initial_average_price,
			remarks: 'Initial item transaction'
		}

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
            is_deleted: false,
        };

		if(name) {
			whereCondition = {
				name: { contains: name.trim(), mode: 'insensitive' } ,
			};
		}

		if(item_type_id) {
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
						txn_number: 'desc'
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
				rr_items: true
			},
			where: { id }
		})

		if(!item){
			throw new NotFoundException('Item not found')
		}

		return item

	}

	async findByCode(code: string): Promise<Item> {
		
		this.logger.log('fineOne()', code)

		const item = await this.prisma.item.findUnique({
			include: this.includedFields,
			where: { code }
		})

		if(!item){
			throw new NotFoundException('Item not found')
		}

		return item

	}

	async update(id: string, input: UpdateItemInput): Promise<Item> {
		
		const existingItem = await this.findOne(id)

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
			description: input.description ?? existingItem.description
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

		await this.prisma.item.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "Item successfully deleted"
		}
	}
}
