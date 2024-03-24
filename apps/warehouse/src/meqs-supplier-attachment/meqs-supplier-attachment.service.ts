import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMeqsSupplierAttachmentInput } from './dto/create-meqs-supplier-attachment.input';
import { UpdateMeqsSupplierAttachmentInput } from './dto/update-meqs-supplier-attachment.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { MEQSSupplierAttachment, Prisma } from 'apps/warehouse/prisma/generated/client';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';
import axios from 'axios';
import { isAdmin } from '../__common__/helpers';

@Injectable()
export class MeqsSupplierAttachmentService {

    private readonly logger = new Logger(MeqsSupplierAttachmentService.name)
    private authUser: AuthUser

    constructor(private readonly prisma: PrismaService) { }

    setAuthUser(authUser: AuthUser) {
        this.authUser = authUser
    }

    async create(input: CreateMeqsSupplierAttachmentInput): Promise<MEQSSupplierAttachment> {

        if (!this.canAccess(input.meqs_supplier_id)) {
            throw new ForbiddenException('Only Admin and Owner can create meqs supplier attachment!')
        }

        const data: Prisma.MEQSSupplierAttachmentCreateInput = {
            meqs_supplier: { connect: { id: input.meqs_supplier_id } },
            src: input.src,
            filename: input.filename,
            created_by: this.authUser.user.username
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

    async findOne(id: string): Promise<MEQSSupplierAttachment | null> {

        const item = await this.prisma.mEQSSupplierAttachment.findUnique({
            include: {
                meqs_supplier: true
            },
            where: { id }
        })

        if (!item) {
            throw new NotFoundException('MEQS Supplier Attachment not found')
        }

        return item

    }

    async update(id: string, input: UpdateMeqsSupplierAttachmentInput): Promise<MEQSSupplierAttachment> {

        const existingItem = await this.findOne(id)

        if (!this.canAccess(existingItem.meqs_supplier_id)) {
            throw new ForbiddenException('Only Admin and Owner can update meqs supplier!')
        }

        const data: Prisma.MEQSSupplierAttachmentUpdateInput = {
            src: input.src ?? existingItem.src,
            filename: input.filename ?? existingItem.filename,
            updated_by: this.authUser.user.username
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

        if (!this.canAccess(existingItem.meqs_supplier_id)) {
            throw new ForbiddenException('Only Admin and Owner can remove meqs supplier!')
        }

        await this.prisma.mEQSSupplierAttachment.delete({
            where: { id },
        })

        this.deleteFiles([existingItem.src])

        return {
            success: true,
            msg: "MEQS Supplier Attachment successfully deleted"
        }

    }

    private async deleteFiles(filePaths: string[]) {

        console.log('deleteFiles', filePaths)

        const url = process.env.API_URL + '/api/v1/file-upload/warehouse/meqs'

        console.log('url', url)

        return axios.delete(url, { data: filePaths });
    }

    private async canAccess(meqs_supplier_id: string): Promise<boolean> {

        if (isAdmin(this.authUser)) return true

        const meqsSupplier = await this.prisma.mEQSSupplier.findUnique({
            where: {
                id: meqs_supplier_id
            },
            include: {
                meqs: true
            }
        })

        if (!meqsSupplier) {
            throw new NotFoundException('meqsSupplier not found with id of ' + meqs_supplier_id)
        }

        const isOwner = meqsSupplier.meqs.created_by === this.authUser.user.username

        if (isOwner) return true

        return false

    }

}
