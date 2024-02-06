import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Item, Prisma } from 'apps/warehouse/prisma/generated/client';
import { ITEM_TRANSACTION_TYPE } from '../__common__/types';
import { WarehouseRemoveResponse } from '../__common__/classes';

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
			description: input.code,
			initial_quantity: input.initial_quantity,
			quantity: input.initial_quantity,
			average_price: input.initial_average_price,
			initial_average_price: input.initial_average_price,
			is_initial: true,
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

	async findAll(): Promise<Item[]> {
		return this.prisma.item.findMany({
			include: this.includedFields,
			where: {
				is_deleted: false
			}
		})
	}

	async findOne(id: string): Promise<Item> {
		
		this.logger.log('fineOne()', id)

		const item = await this.prisma.item.findUnique({
			include: this.includedFields,
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

		let item_type = {
			connect: {
				id: existingItem.item_type_id
			}
		}

		if(input.item_type_id){
			item_type = {
				connect: {
					id: input.item_type_id
				}
			}
		}

		let unit = {
			connect: {
				id: existingItem.unit_id
			}
		}

		if(input.unit_id){
			unit = {
				connect: {
					id: input.unit_id
				}
			}
		}

		const data: Prisma.ItemUpdateInput = {
			item_type,
			unit,
			code: input.code ?? existingItem.code,
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
