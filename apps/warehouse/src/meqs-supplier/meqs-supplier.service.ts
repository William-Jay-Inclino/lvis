import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMeqsSupplierInput } from './dto/create-meqs-supplier.input';
import { UpdateMeqsSupplierInput } from './dto/update-meqs-supplier.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { MEQSSupplier, Prisma } from 'apps/warehouse/prisma/generated/client';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';
import { HttpService } from '@nestjs/axios';
import { MeqsSupplierAttachment } from '../meqs-supplier-attachment/entities/meqs-supplier-attachment.entity';
import axios from 'axios';
import { isAdmin } from '../__common__/helpers';

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

        if (!this.canAccess(input.meqs_id)) {
            throw new ForbiddenException('Only Admin and Owner can create meqs supplier!')
        }

        if (!this.canCreate(input)) {
            throw new BadRequestException()
        }

        const createdBy = this.authUser.user.username

        const data: Prisma.MEQSSupplierCreateInput = {
            meqs: { connect: { id: input.meqs_id } },
            supplier: { connect: { id: input.supplier_id } },
            payment_terms: input.payment_terms,
            created_by: createdBy,
            // attachments: {
            //     create: input.attachments.map(attachment => {
            //         const attachmentInput: Prisma.MEQSSupplierAttachmentCreateWithoutMeqs_supplierInput = {
            //             src: attachment.src,
            //             filename: attachment.filename,
            //             created_by: createdBy
            //         }
            //         return attachmentInput
            //     })
            // },
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
                meqs_supplier_items: {
                    include: {
                        canvass_item: {
                            include: {
                                unit: true,
                                brand: true,
                                item: true
                            }
                        }
                    }
                }
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

        if (!this.canAccess(existingItem.meqs_id)) {
            throw new ForbiddenException('Only Admin and Owner can update meqs supplier!')
        }

        const updatedBy = this.authUser.user.username


        const data: Prisma.MEQSSupplierUpdateInput = {
            payment_terms: input.payment_terms ?? existingItem.payment_terms,
            updated_by: updatedBy
        }

        const queries = []

        if (input.meqs_supplier_items) {

            for (let item of input.meqs_supplier_items) {

                const query = this.prisma.mEQSSupplierItem.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        price: item.price,
                        vat_type: item.vat_type
                    }
                })

                queries.push(query)

            }

        }

        const updateMeqsSupplierQuery = this.prisma.mEQSSupplier.update({
            data,
            where: { id },
            include: {
                supplier: true,
                attachments: true,
                meqs_supplier_items: {
                    include: {
                        canvass_item: {
                            include: {
                                unit: true,
                                brand: true,
                                item: true
                            }
                        }
                    }
                }
            }
        })

        queries.push(updateMeqsSupplierQuery)

        const result = await this.prisma.$transaction(queries)


        this.logger.log('Successfully updated MEQS Supplier and associated items and replaced attachments')

        return result[queries.length - 1]

    }

    async remove(id: string): Promise<WarehouseRemoveResponse> {

        const existingItem = await this.findOne(id)

        if (!this.canAccess(existingItem.meqs_id)) {
            throw new ForbiddenException('Only Admin and Owner can remove meqs supplier!')
        }

        // @ts-ignore
        const filePaths = existingItem.attachments.map((i: MeqsSupplierAttachment) => i.src)

        // delete files in server
        console.log('deleting actual files in server...')
        this.deleteFiles(filePaths)

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

    private async deleteFiles(filePaths: string[]) {

        console.log('deleteFiles', filePaths)

        const url = process.env.API_URL + '/api/v1/file-upload/warehouse/meqs'

        console.log('url', url)

        return axios.delete(url, { data: filePaths });
    }

    private async canAccess(meqs_id: string): Promise<boolean> {

        if (isAdmin(this.authUser)) return true

        const meqs = await this.prisma.mEQS.findUnique({
            where: { id: meqs_id }
        })

        if (!meqs) {
            throw new NotFoundException('MEQS not found with id of ' + meqs_id)
        }

        const isOwner = meqs.created_by === this.authUser.user.username

        if (isOwner) return true

        return false

    }

}
