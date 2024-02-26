import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMeqsSupplierItemInput } from './dto/create-meqs-supplier-item.input';
import { UpdateMeqsSupplierItemInput } from './dto/update-meqs-supplier-item.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { MEQSSupplierItem, Prisma } from 'apps/warehouse/prisma/generated/client';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Injectable()
export class MeqsSupplierItemService {

	private readonly logger = new Logger(MeqsSupplierItemService.name)

	constructor(private readonly prisma: PrismaService) {}

	async create(input: CreateMeqsSupplierItemInput): Promise<MEQSSupplierItem> {

		const data: Prisma.MEQSSupplierItemCreateInput = {
			meqs_supplier: { connect: { id: input.meqs_supplier_id } },
			canvass_item: { connect: { id: input.canvass_item_id } },
			price: input.price,
			notes: input.notes ?? null,
			is_awarded: input.is_awarded
		}

		const created = await this.prisma.mEQSSupplierItem.create({
			data,
			include: {
				meqs_supplier: true,
				canvass_item: true
			}
		})

		this.logger.log('Successfully created MEQSSupplier')

		return created

	}

	async findAll(): Promise<MEQSSupplierItem[]> {
		return await this.prisma.mEQSSupplierItem.findMany({
			include: {
				meqs_supplier: true,
				canvass_item: true
			},
			where: {
				is_deleted: false
			}
		})
	}

	async findOne(id: string): Promise<MEQSSupplierItem | null> {
		const item = await this.prisma.mEQSSupplierItem.findUnique({
			include: {
				meqs_supplier: true,
				canvass_item: true
			},
			where: { id }
		})

		if(!item){
            throw new NotFoundException('MEQS Supplier Item not found')
        }

        return item
	}

	async update(id: string, input: UpdateMeqsSupplierItemInput): Promise<MEQSSupplierItem> {
		
		const existingItem = await this.findOne(id)

		const data: Prisma.MEQSSupplierItemUpdateInput = {
			price: input.price ?? existingItem.price,
			notes: input.notes ?? existingItem.notes,
			is_awarded: input.is_awarded ?? existingItem.is_awarded
		}

		const updated = await this.prisma.mEQSSupplierItem.update({ 
			data,
			where: { id },
			include: {
				meqs_supplier: true,
				canvass_item: true
			}
		 })

		this.logger.log('Successfully updated MEQS Supplier Item')

		return updated

	}

    async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.mEQSSupplierItem.delete( {
			where: { id },
		} )

		return {
			success: true,
			msg: "MEQS Supplier Item successfully deleted"
		}

	}
	
}
