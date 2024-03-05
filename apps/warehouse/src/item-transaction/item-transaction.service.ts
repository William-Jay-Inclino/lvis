import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateItemTransactionInput } from './dto/create-item-transaction.input';
import { UpdateItemTransactionInput } from './dto/update-item-transaction.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { ItemTransaction, Prisma, RRApprover, RRItem } from 'apps/warehouse/prisma/generated/client';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { OnEvent } from '@nestjs/event-emitter';
import { RrApproverStatusUpdated } from '../rr-approver/events/rr-approver-status-updated.event';
import { APPROVAL_STATUS, ITEM_TRANSACTION_TYPE } from '../__common__/types';

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

        const totalQuantity = item.total_quantity + input.quantity;

        const updateItem = this.prisma.item.update({
            where: { id: item.id },
            data: {
                total_quantity: totalQuantity
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

        const sameQtyValue = input.quantity && (input.quantity === existingItem.quantity)

        if(!input.quantity || sameQtyValue){
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

        const newQuantity = (item.total_quantity - existingItem.quantity) + input.quantity

        const updateItem = this.prisma.item.update({
            where: { id: item.id },
            data: {
                total_quantity: newQuantity
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

    private isRrStatusApproved(approvers: RRApprover[]): boolean {

		for(let approver of approvers) {

			if(approver.status !== APPROVAL_STATUS.APPROVED) {
				return false 
			}

		}

		return true

	}

    private async transactRrItems(rrId: string, rrItems: RRItem[]): Promise<{success: boolean}> {

        console.log('transactRrItems', rrItems)

        const queries = []

        // prepare query for item transaction
        const itemTransactions: Prisma.ItemTransactionCreateManyInput[] = []

        for(let rrItem of rrItems) {

            if(!rrItem.item_id) {
                continue
            }

            const data: Prisma.ItemTransactionCreateManyInput = {
                item_id: rrItem.item_id,
                rr_item_id: rrItem.id,
                type: ITEM_TRANSACTION_TYPE.STOCK_IN,
                quantity: rrItem.quantity_accepted,
                price: rrItem.gross_price,
                remarks: 'From RR'
            } 

            itemTransactions.push(data)

        }

        const createItemTransactionsQuery = this.prisma.itemTransaction.createMany({
            data: itemTransactions
        })

        queries.push(createItemTransactionsQuery)

        // prepare queries for updating item quantity based on item_transactions
        for(let transaction of itemTransactions) {

            const item = await this.prisma.item.findUnique({ where: { id: transaction.item_id } });
            if (!item) {
                throw new NotFoundException(`Item not found with item_id: ${transaction.item_id}`);
            }

            const totalQuantity = item.total_quantity + transaction.quantity;

            const updateItemQtyQuery = this.prisma.item.update({
                where: { id: item.id },
                data: { total_quantity: totalQuantity },
            });

            queries.push(updateItemQtyQuery)

        }


        // set is_completed field in rr table to true 
        const updateRRQuery = this.prisma.rR.update({
            where: {
                id: rrId
            },
            data: {
                is_completed: true
            }
        })
        queries.push(updateRRQuery)

        console.log('queries', queries)


        // EXECUTE QUERIES
        await this.prisma.$transaction(queries)

        return {
            success: true
        }

    }

    // private async prepareUpdateItemQuantityQueries(itemTransactions: Prisma.ItemTransactionCreateManyInput[]): Promise<any[]> {
    //     const queries = itemTransactions.map(async (transaction) => {

    //         console.log('transaction', transaction)

    //         const item = await this.prisma.item.findUnique({ where: { id: transaction.item_id } });
    //         if (!item) {
    //             throw new NotFoundException(`Item not found with item_id: ${transaction.item_id}`);
    //         }

    //         const totalQuantity = item.total_quantity + transaction.quantity;

    //         return this.prisma.item.update({
    //             where: { id: item.id },
    //             data: { total_quantity: totalQuantity },
    //         });

    //     });


    
    //     return Promise.all(queries);
    // }

    @OnEvent('rr-approver-status.updated')
    async handleRrApproverStatusUpdated(payload: RrApproverStatusUpdated) {

        this.logger.log('=== item-transaction.service.ts ===')

		console.log('handleRrApproverStatusUpdated()', payload)
		
		const rrApprover = await this.prisma.rRApprover.findUnique({
			where: { id: payload.id },
			include: {
				rr: {
					include: {
						rr_items: true,
						rr_approvers: {
                            where: {
                                is_deleted: false
                            }
                        }
					}
				}
			}
		})

		if(!rrApprover) {
			throw new NotFoundException('rrApprover not found with id: ' + payload.id)
		}

		if(rrApprover.rr.is_completed) {
			console.log('RR is already completed. End function')
			return 
		}

		const approvers = rrApprover.rr.rr_approvers

        console.log('approvers', approvers)

		const isApproved = this.isRrStatusApproved(approvers)

		if(!isApproved) {
			console.log('RR status is not approved. End function')
			return 
		}

		console.log('Transacting RR items...')


        const hasItemToTransact = rrApprover.rr.rr_items.find(i => !!i.item_id)

        // if no items to transact just set the rr to complete
        if(!hasItemToTransact) {

            const updatedRR = await this.prisma.rR.update({
                select: {
                    is_completed: true
                },
                where: { id: rrApprover.rr_id },
                data: {
                    is_completed: true
                }
            })

            console.log('RR is_complete', updatedRR.is_completed)

            return 

        }   

        // add rr items to item_transaction table and update total quantity of item in the item table
        const response = await this.transactRrItems(rrApprover.rr_id, rrApprover.rr.rr_items)

        console.log('response', response)

    }

}
