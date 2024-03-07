import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCanvassItemInput } from './dto/create-canvass-item.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { CanvassItem, Prisma } from 'apps/warehouse/prisma/generated/client';
import { UpdateCanvassItemInput } from './dto/update-canvass-item.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { VAT_TYPE } from '../__common__/types';
import { MeqsSupplierItem } from '../meqs-supplier-item/entities/meqs-supplier-item.entity';

@Injectable()
export class CanvassItemService {

	private readonly logger = new Logger(CanvassItemService.name);

	constructor(private readonly prisma: PrismaService) { }

	async create(input: CreateCanvassItemInput): Promise<CanvassItem> {

		this.logger.log('create()')

		if (!input.canvass_id) {
			throw new BadRequestException("canvass id not found")
		}

		const data: Prisma.CanvassItemCreateInput = {
			description: input.description,
			canvass: {
				connect: { id: input.canvass_id }
			},
			brand: input.brand_id ? { connect: { id: input.brand_id } } : undefined,
			unit: input.unit_id ? { connect: { id: input.unit_id } } : undefined,
			quantity: input.quantity
		}


		const meqsSuppliers = await this.prisma.mEQSSupplier.findMany({
			where: {
				meqs: {
					OR: [
						{ rv: { canvass_id: input.canvass_id } },
						{ spr: { canvass_id: input.canvass_id } },
						{ jo: { canvass_id: input.canvass_id } }
					]
				}
			}
		})

		console.log('meqsSuppliers', meqsSuppliers)

		// if canvass is still not reference in MEQS then normal create
		if (meqsSuppliers.length === 0) {

			console.log('no meqsSuppliers')

			const createdCanvassItem = await this.prisma.canvassItem.create({
				data,
				include: {
					unit: true,
					brand: true
				}
			})

			this.logger.log('Successfully created canvass item')

			return createdCanvassItem

		}


		// if canvass is already reference in MEQS then also create meqs_supplier_item in all meqs_supplier

		const meqsSupplierItems = []

		for (let meqsSupplier of meqsSuppliers) {

			meqsSupplierItems.push({
				meqs_supplier_id: meqsSupplier.id,
				price: 0,
				notes: '',
				is_awarded: false,
				vat_type: VAT_TYPE.NONE
			})

		}

		data.meqs_supplier_items = {
			create: meqsSupplierItems.map((i: MeqsSupplierItem) => {

				const meqsSupplierItemData: Prisma.MEQSSupplierItemCreateWithoutCanvass_itemInput = {
					meqs_supplier: { connect: { id: i.meqs_supplier_id } },
					price: i.price,
					notes: i.notes,
					is_awarded: false,
					vat_type: VAT_TYPE.NONE
				}

				return meqsSupplierItemData

			})
		}

		console.log('data', data)

		const createdCanvassItemWithMeqsSupplierItems = await this.prisma.canvassItem.create({
			data,
			include: {
				unit: true,
				brand: true
			}
		})

		this.logger.log('Successfully created canvass item with MEQS Supplier Items')

		return createdCanvassItemWithMeqsSupplierItems


	}

	// async create(input: CreateCanvassItemInput): Promise<CanvassItem> {

	// 	this.logger.log('create()')

	// 	if (!input.canvass_id) {
	// 		throw new BadRequestException("canvass id not found")
	// 	}

	// 	const data: Prisma.CanvassItemCreateInput = {
	// 		description: input.description,
	// 		canvass: {
	// 			connect: { id: input.canvass_id }
	// 		},
	// 		brand: input.brand_id ? { connect: { id: input.brand_id } } : undefined,
	// 		unit: input.unit_id ? { connect: { id: input.unit_id } } : undefined,
	// 		quantity: input.quantity
	// 	}

	// 	const created = await this.prisma.canvassItem.create({
	// 		data,
	// 		include: {
	// 			unit: true,
	// 			brand: true
	// 		}
	// 	})

	// 	this.logger.log('Successfully created canvass item')

	// 	return created
	// }

	async findAll(): Promise<CanvassItem[]> {
		return await this.prisma.canvassItem.findMany({
			include: {
				unit: true,
				brand: true
			},
			where: {
				is_deleted: false
			},
		})
	}

	async findOne(id: string): Promise<CanvassItem | null> {
		const item = await this.prisma.canvassItem.findUnique({
			include: {
				unit: true,
				brand: true
			},
			where: { id }
		})

		if (!item) {
			throw new NotFoundException('Item not found')
		}

		return item
	}

	async update(id: string, input: UpdateCanvassItemInput): Promise<CanvassItem> {

		const existingItem = await this.findOne(id)

		const data: Prisma.CanvassItemUpdateInput = {
			description: input.description ?? existingItem.description,
			brand: input.brand_id ? { connect: { id: input.brand_id } } : { disconnect: true },
			unit: input.unit_id ? { connect: { id: input.unit_id } } : { disconnect: true },
			quantity: input.quantity
		}

		const updated = await this.prisma.canvassItem.update({
			data,
			where: {
				id
			},
			include: {
				unit: true,
				brand: true
			}
		})

		this.logger.log('Successfully updated Canvass Item')

		return updated
	}

	async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.canvassItem.delete({
			where: { id }
		})

		return {
			success: true,
			msg: "Canvass Item successfully deleted"
		}

	}

}
