import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRRItemInput } from './dto/create-rr-item.input';
import { UpdateRrItemInput } from './dto/update-rr-item.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, RRItem } from 'apps/warehouse/prisma/generated/client';
import { ITEM_TRANSACTION_TYPE } from '../__common__/types';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Injectable()
export class RrItemService {

	private readonly logger = new Logger(RrItemService.name)
	private includedFields = {
		rr: true
	}

    constructor(
        private readonly prisma: PrismaService,
    ) {}
	
	// create rr item and item transaction
	// update item quantity
	async create(input: CreateRRItemInput): Promise<RRItem>{
		
		this.logger.log('create')

		const itemTransaction: Prisma.ItemTransactionCreateWithoutRr_itemInput = {
			item: { connect: { id: input.item_id } },
			type: ITEM_TRANSACTION_TYPE.STOCK_IN,
			quantity: input.quantity_accepted,
			price: input.net_price
		}

		const data: Prisma.RRItemCreateInput = {
			rr: { connect: { id: input.rr_id } },
			item: input.item_id ? { connect: { id: input.item_id } } : undefined,
			item_brand: input.item_brand_id ? { connect: { id: input.item_brand_id } } : undefined,
			unit: input.unit_id ? { connect: { id: input.unit_id } } : undefined,
			item_class: input.item_class,
			quantity_delivered: input.quantity_delivered,
			quantity_accepted: input.quantity_accepted,
			description: input.description,
			vat_type: input.vat_type,
			gross_price: input.gross_price,
			net_price: input.net_price,
			freight_cost: input.freight_cost,
			item_transaction: {
				create: itemTransaction
			}
		}

		const createRRItemQuery = this.prisma.rRItem.create({
            data,
            include: this.includedFields
        })
		
		const item = await this.prisma.item.findUnique({
			where: {
				id: input.item_id
			}
		})

		if(!item) {
            throw new NotFoundException('Item not found')
        }

		const totalQuantity = item.quantity + input.quantity_accepted

		const updateItemQuery = this.prisma.item.update({
			where: {
				id: input.item_id
			},
			data: {
				quantity: totalQuantity
			}
		})


		const [createdRRItem, updatedItem] = await this.prisma.$transaction([
			createRRItemQuery,
			updateItemQuery
		])

        this.logger.log('Successfully created RR Item and updated Item quantity')

        return createdRRItem

	}

	async findAll(): Promise<RRItem[]> {

		return await this.prisma.rRItem.findMany({
			where: { is_deleted: false },
			include: this.includedFields
		})

	}

	async findByRrId(rrId: string): Promise<RRItem[]> {

		return await this.prisma.rRItem.findMany({
			where: {
				is_deleted: false,
				rr_id: rrId
			},
			include: this.includedFields
		})

	}

	async findByRrNumber(rrNumber: string): Promise<RRItem[]> {

		return await this.prisma.rRItem.findMany({
			where: {
				is_deleted: false,
				rr: {
					rr_number: rrNumber
				}
			},
			include: this.includedFields
		})

	}

	async findOne(id: string): Promise<RRItem | null> {
        const item = await this.prisma.rRItem.findUnique({
            include: this.includedFields,
            where: { id }
        })

        if(!item) {
            throw new NotFoundException('RR Item not found')
        }

        return item 
	}

	async update(id: string, input: UpdateRrItemInput): Promise<RRItem> {

        this.logger.log('update(')

        const existingItem = await this.findOne(id)


		// prepare rr item data to be updated
		const data: Prisma.RRItemUpdateInput = {
			item: { connect: { id: input.item_id || existingItem.item_id } },
			item_brand: { connect: { id: input.item_brand_id || existingItem.item_brand_id } },
			unit: { connect: { id: input.unit_id || existingItem.unit_id } },
			item_class: input.item_class ?? existingItem.item_class,
			quantity_delivered: input.quantity_delivered ?? existingItem.quantity_delivered,
			quantity_accepted: input.quantity_accepted ?? existingItem.quantity_accepted,
			description: input.description ?? existingItem.description,
			vat_type: input.vat_type ?? existingItem.vat_type,
			gross_price: input.gross_price ?? existingItem.gross_price,
			net_price: input.net_price ?? existingItem.net_price,
			freight_cost: input.freight_cost ?? existingItem.freight_cost,
		};


		// if no quantity_accepted or net price to update then only update rr item 
		if(!input.quantity_accepted || !input.net_price) {
			const updated = await this.prisma.rRItem.update({
				data,
				where: { id },
				include: this.includedFields
			})

			this.logger.log('Successfully updated RR Item')

			return updated
		}


		// set update rr item query
		const updateRRItemQuery = this.prisma.rRItem.update({
			data,
			where: { id },
			include: this.includedFields
		})
		
		// get item transaction
        const itemTransaction = await this.prisma.itemTransaction.findUnique({
            where: { rr_item_id: id }
        })

		if(!itemTransaction) {
            throw new NotFoundException('Item transaction not found')
        }

		// set update item transaction query
		const updateItemTransactionQuery = this.prisma.itemTransaction.update({
			data: {
				quantity: input.quantity_accepted ?? itemTransaction.quantity,
				price: input.net_price ?? itemTransaction.price
			},
			where: {
				id: itemTransaction.id
			}
		})

		// if no quantity_accepted then update only rr item and item transaction. No need to update item new quantity
		if(!input.quantity_accepted){

			const [updatedRRItem, updatedItemTransaction] = await this.prisma.$transaction([
				updateRRItemQuery,
				updateItemTransactionQuery
			])

			this.logger.log('Successfully updated RR Item and Item transaction')

			return updatedRRItem

		}

		// set update item query to update it's new quantity
        const item = await this.prisma.item.findUnique({
            where: { id: itemTransaction.item_id }
        })

        if(!item) {
            throw new NotFoundException('Item not found')
        }

		const newQuantity = (item.quantity - itemTransaction.quantity) + input.quantity_accepted

		const updateItemQuery = this.prisma.item.update({
			where: {
				id: item.id
			},
			data: {
				quantity: newQuantity
			}
		})

		// update rr item, item transaction's quantity and price, item's quantity using database transaction

		const [updatedRRItem, updatedItemTransaction, updatedItem] = await this.prisma.$transaction([
			updateRRItemQuery,
			updateItemTransactionQuery,
			updateItemQuery
		])

		this.logger.log('Successfully updated RR Item, Item transaction, and Item')

		return updatedRRItem

	}

	async remove(id: string): Promise<WarehouseRemoveResponse> {
		const existingItem = await this.findOne(id)

		await this.prisma.rRItem.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "RR Item successfully deleted"
		}
	}
}
