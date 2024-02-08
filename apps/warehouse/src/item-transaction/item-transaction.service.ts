import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateItemTransactionInput } from './dto/create-item-transaction.input';
import { UpdateItemTransactionInput } from './dto/update-item-transaction.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { ItemTransaction, Prisma } from 'apps/warehouse/prisma/generated/client';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Injectable()
export class ItemTransactionService {

    private readonly logger = new Logger(ItemTransactionService.name);
    private includedFields = {
        item: {
            include: {
                item_type: true,
                unit: true
            }
        }
    }

    constructor(
		private readonly prisma: PrismaService
	) {}

    async create(input: CreateItemTransactionInput): Promise<ItemTransaction> {

        this.logger.log('create()', input)

        const data: Prisma.ItemTransactionCreateInput = {
            item: { connect: { id: input.item_id } },
            type: input.type,
            quantity: input.quantity,
            price: input.price,
            remarks: input.remarks ?? undefined
        }

        // initialize create item transaction

        const createItemTransaction = this.prisma.itemTransaction.create({
            data,
            include: this.includedFields
        })

        // initialize update item's quantity and average_price

        const item = await this.prisma.item.findUnique({
            where: { id: input.item_id }
        })

        if (!item) {
            throw new Error(`Item with ID ${input.item_id} not found.`);
        }

        const totalQuantity = item.quantity + input.quantity;

        const updateItem = this.prisma.item.update({
            where: { id: item.id },
            data: {
                quantity: totalQuantity
            }
        })

        // create item transaction and update item using db transaction

        const [createdItemTransaction, updatedItem] = await this.prisma.$transaction([
            createItemTransaction,
            updateItem
        ])

        this.logger.log('Successfully created Item Transaction')

        return createdItemTransaction

    }

    async findAll(): Promise<ItemTransaction[]> {
        return this.prisma.itemTransaction.findMany({
            include: this.includedFields,
            where: {
                is_deleted: false
            }
        })
    }

    async findOne(id: string): Promise<ItemTransaction> {
        this.logger.log('fineOne()', id)

		const item = await this.prisma.itemTransaction.findUnique({
			include: this.includedFields,
			where: { id }
		})

		if(!item){
			throw new NotFoundException('Item Transaction not found')
		}

		return item
    }

    async update(id: string, input: UpdateItemTransactionInput): Promise<ItemTransaction> {
        
        const existingItem = await this.findOne(id)

        if(existingItem.rr_item_id){

            if(input.quantity || input.price){

                throw new BadRequestException('Unable to update quantity or price. Update it in  rr item module instead')

            }

        }

        const data: Prisma.ItemTransactionUpdateInput = {
            remarks: input.remarks ?? existingItem.remarks,
            price: input.price ?? existingItem.price,
            quantity: input.price ?? existingItem.quantity,
        }

        if(!input.quantity){
            const updated = await this.prisma.itemTransaction.update({
                data,
                include: this.includedFields,
                where: {
                    id
                }
            })
    
            this.logger.log('Successfully updated item')
            return updated
        }

        // if there is quantity then use db transactions since we also need to update the quantity in item table 

        const updateItemTransaction = this.prisma.itemTransaction.update({
            data,
            include: this.includedFields,
            where: {
                id
            }
        })

        const item = await this.prisma.item.findUnique({
            where: { id: input.item_id }
        })

        if (!item) {
            throw new Error(`Item with ID ${input.item_id} not found.`);
        }

        const newQuantity = (item.quantity - existingItem.quantity) + input.quantity

        const updateItem = this.prisma.item.update({
            where: { id: item.id },
            data: {
                quantity: newQuantity
            }
        })


        const [updatedItemTransaction, updatedItem] = await this.prisma.$transaction([
            updateItemTransaction,
            updateItem
        ])

        this.logger.log('Successfully updated item transaction and quantity in item table')

        return updatedItemTransaction

    }

	async remove(id: string): Promise<WarehouseRemoveResponse> {
		const existingItem = await this.findOne(id)

		await this.prisma.itemTransaction.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "Item Transaction successfully deleted"
		}
	}
}
