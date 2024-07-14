import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCanvassItemInput } from './dto/create-canvass-item.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { CanvassItem, Prisma } from 'apps/warehouse/prisma/generated/client';
import { UpdateCanvassItemInput } from './dto/update-canvass-item.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { VAT_TYPE } from '../__common__/types';
import { MeqsSupplierItem } from '../meqs-supplier-item/entities/meqs-supplier-item.entity';
import { AuthUser } from '../__common__/auth-user.entity';
import { isAdmin } from '../__common__/helpers';

@Injectable()
export class CanvassItemService {

	private readonly logger = new Logger(CanvassItemService.name);
	private authUser: AuthUser

	constructor(private readonly prisma: PrismaService) { }

	setAuthUser(authUser: AuthUser) {
		this.authUser = authUser
	}

	async create(input: CreateCanvassItemInput): Promise<CanvassItem> {

		this.logger.log('create()')

		if (!this.canAccess(input.canvass_id)) {
			throw new ForbiddenException('Only Admin and Owner can create canvass item!')
		}

		const createdBy = this.authUser.user.username

		const data: Prisma.CanvassItemCreateInput = {
			canvass: { connect: { id: input.canvass_id } },
			unit: input.unit_id ? { connect: { id: input.unit_id } } : undefined,
			item: input.item_id ? { connect: { id: input.item_id } } : undefined,
			description: input.description,
			quantity: input.quantity,
			created_by: createdBy
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
					item: true
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
				vat_type: VAT_TYPE.NONE,
				created_by: createdBy
			})

		}

		data.meqs_supplier_items = {
			create: meqsSupplierItems.map((i: MeqsSupplierItem) => {

				const meqsSupplierItemData: Prisma.MEQSSupplierItemCreateWithoutCanvass_itemInput = {
					meqs_supplier: { connect: { id: i.meqs_supplier_id } },
					price: i.price,
					notes: i.notes,
					is_awarded: false,
					vat_type: VAT_TYPE.NONE,
					created_by: i.created_by
				}

				return meqsSupplierItemData

			})
		}

		console.log('data', data)

		const createdCanvassItemWithMeqsSupplierItems = await this.prisma.canvassItem.create({
			data,
			include: {
				unit: true,
			}
		})

		this.logger.log('Successfully created canvass item with MEQS Supplier Items')

		return createdCanvassItemWithMeqsSupplierItems


	}

	async findOne(id: string): Promise<CanvassItem | null> {
		const item = await this.prisma.canvassItem.findUnique({
			include: {
				unit: true,
				item: true
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

		if (!this.canAccess(existingItem.canvass_id)) {
			throw new ForbiddenException('Only Admin and Owner can update canvass item!')
		}

		const updatedBy = this.authUser.user.username

		const data: Prisma.CanvassItemUpdateInput = {
			description: input.description ?? existingItem.description,
			unit: input.unit_id ? { connect: { id: input.unit_id } } : { disconnect: true },
			item: input.item_id ? { connect: { id: input.item_id } } : { disconnect: true },
			quantity: input.quantity,
			updated_by: updatedBy
		}

		const updated = await this.prisma.canvassItem.update({
			data,
			where: {
				id
			},
			include: {
				unit: true,
				item: true
			}
		})

		this.logger.log('Successfully updated Canvass Item')

		return updated
	}

	async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		if (!this.canAccess(existingItem.canvass_id)) {
			throw new ForbiddenException('Only Admin and Owner can remove canvass item!')
		}

		await this.prisma.canvassItem.delete({
			where: { id }
		})

		return {
			success: true,
			msg: "Canvass Item successfully deleted"
		}

	}

	private async canAccess(canvass_id: string): Promise<boolean> {

		if (isAdmin(this.authUser)) return true

		const canvass = await this.prisma.canvass.findUnique({
			where: { id: canvass_id }
		})

		if (!canvass) {
			throw new NotFoundException('Canvass not found with id of ' + canvass_id)
		}

		const isOwner = canvass.created_by === this.authUser.user.username

		if (isOwner) return true

		return false

	}

	// async isReferenceInRR(id: string): Promise<boolean> {

	// 	const rrItem = await this.prisma.rRItem.findFirst({
	// 		select: {
	// 			id: true
	// 		},
	// 		where: {
	// 			meqs_supplier_item: {
	// 				canvass_item_id: id
	// 			}
	// 		}
	// 	})

	// 	return !!rrItem

	// }

}
