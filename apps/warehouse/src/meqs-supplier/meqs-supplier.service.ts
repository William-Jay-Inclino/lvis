import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMeqsSupplierInput } from './dto/create-meqs-supplier.input';
import { UpdateMeqsSupplierInput } from './dto/update-meqs-supplier.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { MEQSSupplier, Prisma } from 'apps/warehouse/prisma/generated/client';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';
import { HttpService } from '@nestjs/axios';
import { MeqsSupplierAttachment } from '../meqs-supplier-attachment/entities/meqs-supplier-attachment.entity';

@Injectable()
export class MeqsSupplierService {

    private readonly logger = new Logger(MeqsSupplierService.name)
    private authUser: AuthUser

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService
    ) { }

    setAuthUser(authUser: AuthUser) {
        this.authUser = authUser
    }

    async create(input: CreateMeqsSupplierInput): Promise<MEQSSupplier> {

        if (!this.canCreate(input)) {
            throw new BadRequestException()
        }

        const createdBy = this.authUser.user.username

        const data: Prisma.MEQSSupplierCreateInput = {
            meqs: { connect: { id: input.meqs_id } },
            supplier: { connect: { id: input.supplier_id } },
            payment_terms: input.payment_terms,
            created_by: createdBy,
            attachments: {
                create: input.attachments.map(attachment => {
                    const attachmentInput: Prisma.MEQSSupplierAttachmentCreateWithoutMeqs_supplierInput = {
                        src: attachment.src,
                        created_by: createdBy
                    }
                    return attachmentInput
                })
            },
            meqs_supplier_items: {
                create: input.meqs_supplier_items.map(item => {

                    const itemInput: Prisma.MEQSSupplierItemCreateWithoutMeqs_supplierInput = {
                        price: item.price,
                        notes: item.notes,
                        vat_type: item.vat_type,
                        is_awarded: item.is_awarded,
                        canvass_item: { connect: { id: item.canvass_item_id } },
                        created_by: createdBy
                    }

                    return itemInput
                })
            }
        }

        const created = await this.prisma.mEQSSupplier.create({
            data,
            include: {
                supplier: true,
                attachments: true,
                meqs_supplier_items: true
            }
        })

        this.logger.log('Successfully created MEQSSupplier')

        return created

    }

    async findOne(id: string): Promise<MEQSSupplier | null> {

        const item = await this.prisma.mEQSSupplier.findUnique({
            include: {
                meqs: true,
                supplier: true,
                meqs_supplier_items: true,
                attachments: true
            },
            where: { id }
        })

        if (!item) {
            throw new NotFoundException('MEQS Supplier not found')
        }

        return item

    }

    async update(id: string, input: UpdateMeqsSupplierInput): Promise<MEQSSupplier> {

        this.logger.log('update')

        console.log('input', input)

        const existingItem = await this.findOne(id)

        const createdBy = this.authUser.user.username
        const updatedBy = this.authUser.user.username

        const data: Prisma.MEQSSupplierUpdateInput = {
            payment_terms: input.payment_terms ?? existingItem.payment_terms,
            updated_by: updatedBy
        }

        // create new attachments since we use remove and create technique
        if (input.attachments) {
            data['attachments'] = {
                create: input.attachments.map(attachment => {
                    const attachmentInput: Prisma.MEQSSupplierAttachmentCreateWithoutMeqs_supplierInput = {
                        src: attachment.src,
                        created_by: createdBy
                    }
                    return attachmentInput
                })
            }
        }

        if (input.meqs_supplier_items) {
            data['meqs_supplier_items'] = {
                connect: input.meqs_supplier_items.map(supplier => {

                    return {
                        price: supplier.price,
                        vat_type: supplier.vat_type,
                        id: supplier.id
                    }

                })
            }
        }


        const updateMeqsSupplierQuery = this.prisma.mEQSSupplier.update({
            data,
            where: { id },
            include: {
                supplier: true,
                attachments: true,
                meqs_supplier_items: true
            }
        })

        const removeMeqsAttachmentsQuery = this.prisma.mEQSSupplierAttachment.deleteMany({
            where: {
                meqs_supplier_id: id
            }
        })

        const result = await this.prisma.$transaction([
            updateMeqsSupplierQuery,
            removeMeqsAttachmentsQuery
        ])

        // @ts-ignore
        const fileNames = existingItem.attachments.map((i: MeqsSupplierAttachment) => i.src)

        // delete files in server
        console.log('deleting actual files in server...')
        this.deleteFiles(fileNames)

        this.logger.log('Successfully updated MEQS Supplier and associated items and replaced attachments')

        return result[0]

    }

    async remove(id: string): Promise<WarehouseRemoveResponse> {

        const existingItem = await this.findOne(id)

        await this.prisma.mEQSSupplier.delete({
            where: { id },
        })

        return {
            success: true,
            msg: "MEQS Supplier successfully deleted"
        }

    }

    async canCreate(input: CreateMeqsSupplierInput): Promise<boolean> {

        const existingMeqsSupplier = await this.prisma.mEQSSupplier.findFirst({
            where: {
                meqs_id: input.meqs_id,
                supplier_id: input.supplier_id
            }
        })

        if (existingMeqsSupplier) {
            throw new BadRequestException(`Meqs ID: ${input.meqs_id} with Supplier ID: ${input.supplier_id} already referenced`)
        }

        return true

    }

    async isReferenced(meqs_supplier_id: string): Promise<Boolean> {

        const meqs = await this.prisma.pO.findUnique({
            where: { meqs_supplier_id }
        })

        if (meqs) return true

        return false

    }

    private async deleteFiles(fileNames: string[]) {

        console.log('deleteFiles', fileNames)

        const url = process.env.API_URL + '/api/v1/file-upload/warehouse/meqs'

        this.httpService.delete(url, { data: fileNames });
    }

}
