import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, Supplier } from 'apps/warehouse/prisma/generated/client';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';

@Injectable()
export class SupplierService {

	private readonly logger = new Logger(SupplierService.name);
	private authUser: AuthUser

	constructor(private readonly prisma: PrismaService) { }

	setAuthUser(authUser: AuthUser) {
		this.authUser = authUser
	}

	async create(input: CreateSupplierInput): Promise<Supplier> {

		const data: Prisma.SupplierCreateInput = {
			name: input.name,
			contact: input.contact,
			tin_no: input.tin_no,
			address: input.address,
			is_vat_registered: input.is_vat_registered,
			created_by: this.authUser.user.username
		}

		const created = await this.prisma.supplier.create({
			data
		})

		this.logger.log('Successfully created Supplier')

		return created

	}

	async findAll(): Promise<Supplier[]> {
		return await this.prisma.supplier.findMany({
			where: {
				deleted_at: null
			}
		})
	}

	async findOne(id: string): Promise<Supplier | null> {

		const item = await this.prisma.supplier.findUnique({
			where: { id }
		})

		console.log('item', item, id)

		if (!item) {
			throw new NotFoundException('Supplier not found')
		}

		return item
	}

	async update(id: string, input: UpdateSupplierInput): Promise<Supplier> {

		const existingItem = await this.findOne(id)

		const data: Prisma.SupplierUpdateInput = {
			name: input.name ?? existingItem.name,
			contact: input.contact ?? existingItem.contact,
			tin_no: input.tin_no ?? existingItem.tin_no,
			address: input.address ?? existingItem.address,
			is_vat_registered: input.is_vat_registered ?? existingItem.is_vat_registered,
			updated_by: this.authUser.user.username
		}


		const updated = await this.prisma.supplier.update({
			data,
			where: {
				id
			}
		})

		this.logger.log('Successfully updated Supplier')

		return updated

	}

	async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.supplier.update({
			where: { id },
			data: {
				deleted_at: new Date(),
				deleted_by: this.authUser.user.username
			}
		})

		return {
			success: true,
			msg: "Supplier successfully deleted"
		}

	}

}
