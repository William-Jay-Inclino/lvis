import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, Supplier } from 'apps/warehouse/prisma/generated/client';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Injectable()
export class SupplierService {

  private readonly logger = new Logger(SupplierService.name);

	constructor(private readonly prisma: PrismaService) {}

    async create(input: CreateSupplierInput): Promise<Supplier> {

        const data: Prisma.SupplierCreateInput = {
            name: input.name,
            contact: input.contact,
			vat_type: input.vat_type
        }

        const created = await this.prisma.supplier.create({
            data
        })

        this.logger.log('Successfully created Supplier')

        return created 

    }

    async findAll(): Promise<Supplier[]> {
		return await this.prisma.supplier.findMany( {
			where: {
				is_deleted: false 
			}
		} )
	}

	async findOne(id: string): Promise<Supplier | null> {

		const item = await this.prisma.supplier.findUnique({
			where: { id }
		})

		console.log('item', item, id)

		if(!item){
            throw new NotFoundException('Supplier not found')
        }

        return item
	}

    async update(id: string, input: UpdateSupplierInput): Promise<Supplier> {

		const existingItem = await this.findOne(id)

		const data: Prisma.SupplierUpdateInput = {
			name: input.name ?? existingItem.name,
			contact: input.contact ?? existingItem.contact,
			vat_type: input.vat_type ?? existingItem.vat_type,
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

		await this.prisma.supplier.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "Supplier successfully deleted"
		}

	}

}
