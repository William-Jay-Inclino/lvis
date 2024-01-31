import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMeqsSupplierAttachmentInput } from './dto/create-meqs-supplier-attachment.input';
import { UpdateMeqsSupplierAttachmentInput } from './dto/update-meqs-supplier-attachment.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { MEQSSupplierAttachment, Prisma } from 'apps/warehouse/prisma/generated/client';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Injectable()
export class MeqsSupplierAttachmentService {

    private readonly logger = new Logger(MeqsSupplierAttachmentService.name)

    constructor(private readonly prisma: PrismaService) {}


    async create(input: CreateMeqsSupplierAttachmentInput): Promise<MEQSSupplierAttachment> {

        const data: Prisma.MEQSSupplierAttachmentCreateInput = {
            meqs_supplier: { connect: { id: input.meqs_supplier_id } },
            src: input.src
        }

        const created = await this.prisma.mEQSSupplierAttachment.create({
            data,
            include: {
                meqs_supplier: true
            }
        })

        this.logger.log('Successfully created MEQS Supplier Attachment')

        return created


    }

    async findAll(): Promise<MEQSSupplierAttachment[]> {
        return await this.prisma.mEQSSupplierAttachment.findMany({
            include: {
                meqs_supplier: true
            },
            where: { is_deleted: false }
        })
    }

    async findOne(id: string): Promise<MEQSSupplierAttachment | null> {

        const item = await this.prisma.mEQSSupplierAttachment.findUnique( {
            include: {
                meqs_supplier: true
            },
            where: { id }
        } )

        if(!item){
            throw new NotFoundException('MEQS Supplier Attachment not found')
        }

        return item

    }

    async update(id: string, input: UpdateMeqsSupplierAttachmentInput): Promise<MEQSSupplierAttachment> {

        const existingItem = await this.findOne(id)

        const data: Prisma.MEQSSupplierAttachmentUpdateInput = {
            src: input.src ?? existingItem.src
        }

        const updated = await this.prisma.mEQSSupplierAttachment.update({
            data,
            where: { id },
            include: {
                meqs_supplier: true
            }
        })

        this.logger.log('Successfully updated MEQS Supplier Attachment')

        return updated

    }

    async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.mEQSSupplierAttachment.delete( {
			where: { id },
		} )

		return {
			success: true,
			msg: "MEQS Supplier Attachment successfully deleted"
		}

	}
}
