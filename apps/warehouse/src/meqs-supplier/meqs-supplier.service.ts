import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMeqsSupplierInput } from './dto/create-meqs-supplier.input';
import { UpdateMeqsSupplierInput } from './dto/update-meqs-supplier.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { MEQSSupplier, Prisma } from 'apps/warehouse/prisma/generated/client';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Injectable()
export class MeqsSupplierService {

    private readonly logger = new Logger(MeqsSupplierService.name)

    constructor(private readonly prisma: PrismaService) {}

    async create(input: CreateMeqsSupplierInput): Promise<MEQSSupplier> {
        
        const data: Prisma.MEQSSupplierCreateInput = {
            meqs: { connect: { id: input.meqs_id } },
            supplier: { connect: { id: input.supplier_id } },
            payment_terms: input.payment_terms
        }

        const created = await this.prisma.mEQSSupplier.create({
            data,
            include: {
                meqs: true,
                supplier: true
            }
        })

        this.logger.log('Successfully created MEQSSupplier')

        return created

    }

    async findAll(): Promise<MEQSSupplier[]> {

        return await this.prisma.mEQSSupplier.findMany( {
            include: {
                meqs: true,
                supplier: true
            },
            where: { is_deleted: false }
        } )

    }

    async findOne(id: string): Promise<MEQSSupplier | null> {

        const item = await this.prisma.mEQSSupplier.findUnique( {
            include: {
                meqs: true,
                supplier: true
            },
            where: { id }
        } )

        if(!item){
            throw new NotFoundException('MEQS Supplier not found')
        }

        return item

    }

    async update(id: string, input: UpdateMeqsSupplierInput): Promise<MEQSSupplier> {

        const existingItem = await this.findOne(id)

        const data: Prisma.MEQSSupplierUpdateInput = {
            payment_terms: input.payment_terms ?? existingItem.payment_terms,
            is_referenced: input.is_referenced ?? existingItem.is_referenced
        }

        const updated = await this.prisma.mEQSSupplier.update({
            data,
            where: { id },
            include: {
                meqs: true,
                supplier: true
            }
        })

        this.logger.log('Successfully updated MEQS Supplier')

        return updated

    }

    async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.mEQSSupplier.delete( {
			where: { id },
		} )

		return {
			success: true,
			msg: "MEQS Supplier successfully deleted"
		}

	}

}
