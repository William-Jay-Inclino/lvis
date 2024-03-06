import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePoApproverInput } from './dto/create-po-approver.input';
import { UpdatePoApproverInput } from './dto/update-po-approver.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, POApprover } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS } from '../__common__/types';
import { AuthUser } from '../__common__/auth-user.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { getLastApprover, isValidApprovalStatus } from '../__common__/helpers';
import { UpdatePoOrderResponse } from './entities/update-po-order-response.entity';

@Injectable()
export class PoApproverService {

    private readonly logger = new Logger(PoApproverService.name);
    private authUser: AuthUser
    private includedFields = {
        po: {
            include: {
                meqs_supplier: {
                    include: {
                        meqs: {
                            include: {
                                rv: {
                                    include: {
                                        canvass: true
                                    }
                                },
                                jo: {
                                    include: {
                                        canvass: true
                                    }
                                },
                                spr: {
                                    include: {
                                        canvass: true
                                    }
                                }
                            }
                        },
                        supplier: true,
                        meqs_supplier_items: {
                            include: {
                                canvass_item: {
                                    include: {
                                        unit: true,
                                        brand: true
                                    }
                                }
                            }
                        },
                        attachments: true
                    }
                }
            }
        }
    }

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) { }

    setAuthUser(authUser: AuthUser) {
        this.authUser = authUser
    }

    async create(input: CreatePoApproverInput): Promise<POApprover> {

        const employeeIds = []

        employeeIds.push(input.approver_id)

        if (input.approver_proxy_id) {
            employeeIds.push(input.approver_proxy_id)
        }

        if (employeeIds.length > 0) {
            const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)

            if (!isValidEmployeeIds) {
                throw new BadRequestException("One or more employee id is invalid")
            }
        }

        const data: Prisma.POApproverCreateInput = {
            po: { connect: { id: input.po_id } },
            approver_id: input.approver_id,
            approver_proxy_id: input.approver_proxy_id ?? null,
            label: input.label,
            order: input.order,
            status: APPROVAL_STATUS.PENDING
        }

        const created = await this.prisma.pOApprover.create({
            data,
            include: this.includedFields
        })

        this.logger.log('Successfully created pOApprover')

        return created
    }

    async findAll(): Promise<POApprover[]> {
        return await this.prisma.pOApprover.findMany({
            include: this.includedFields,
            where: { is_deleted: false },
            orderBy: {
                label: 'asc'
            }
        })
    }

    async findOne(id: string): Promise<POApprover | null> {

        const item = await this.prisma.pOApprover.findUnique({
            where: { id },
            include: this.includedFields
        })

        if (!item) {
            throw new NotFoundException('PO Approver not found')
        }

        return item

    }

    async findByPoId(poId: string): Promise<POApprover[]> {

        this.logger.log('findByPoId()', poId)

        return await this.prisma.pOApprover.findMany({
            // include: this.includedFields,
            where: {
                is_deleted: false,
                po_id: poId
            },
            orderBy: {
                order: 'asc'
            }
        })
    }

    async findByPoNumber(poNumber: string): Promise<POApprover[]> {
        return await this.prisma.pOApprover.findMany({
            include: this.includedFields,
            where: {
                is_deleted: false,
                po: {
                    po_number: poNumber
                }
            },
            orderBy: {
                order: 'asc'
            }
        })
    }

    async update(id: string, input: UpdatePoApproverInput): Promise<POApprover> {
        this.logger.log('update()')

        const existingItem = await this.findOne(id)

        await this.validateInput(input)

        const data: Prisma.POApproverUpdateInput = {
            approver_id: input.approver_id ?? existingItem.approver_id,
            approver_proxy_id: input.approver_proxy_id ?? existingItem.approver_proxy_id,
            date_approval: input.date_approval ? new Date(input.date_approval) : existingItem.date_approval,
            notes: input.notes ?? existingItem.notes,
            status: input.status ?? existingItem.status,
            label: input.label ?? existingItem.label,
            order: input.order ?? existingItem.order,
        }

        const updated = await this.prisma.pOApprover.update({
            data,
            where: { id },
            include: this.includedFields,
        });
        this.logger.log('Successfully updated PO Approver');
        return updated;

    }

    async remove(id: string): Promise<WarehouseRemoveResponse> {

        const existingItem = await this.findOne(id)

        await this.prisma.pOApprover.update({
            where: { id },
            data: { is_deleted: true }
        })

        return {
            success: true,
            msg: "PO Approver successfully deleted"
        }

    }

    async updateManyOrders(inputs: { id: string; order: number }[]): Promise<UpdatePoOrderResponse> {
        try {

            const queries = []

            for (let input of inputs) {

                const updateQuery = this.prisma.pOApprover.update({
                    where: { id: input.id },
                    data: { order: input.order },
                    select: {
                        po_id: true
                    }
                })

                queries.push(updateQuery)

            }

            const result = await this.prisma.$transaction(queries)

            const po = result[0] as POApprover

            console.log('po', po)

            const approvers = await this.findByPoId(po.po_id)

            return {
                success: true,
                approvers: approvers
            };
        } catch (error) {
            this.logger.error(error);
            return { success: false, approvers: [] };
        }
    }

    async forEmployeePendingApprovals(employeeId: string): Promise<POApprover[]> {
        return await this.prisma.pOApprover.findMany({
            where: {
                approver_id: employeeId,
                status: APPROVAL_STATUS.PENDING,
                is_deleted: false
            },
            orderBy: {
                created_at: 'asc'
            },
            include: {
                po: true
            }
        })
    }

    private async areEmployeesExist(employeeIds: string[], authUser: AuthUser): Promise<boolean> {

        this.logger.log('areEmployeesExist', employeeIds);

        const query = `
            query {
                validateEmployeeIds(ids: ${JSON.stringify(employeeIds)})
            }
        `;

        console.log('query', query)

        try {
            const { data } = await firstValueFrom(
                this.httpService.post(
                    process.env.API_GATEWAY_URL,
                    { query },
                    {
                        headers: {
                            Authorization: authUser.authorization,
                            'Content-Type': 'application/json',
                        },
                    }
                ).pipe(
                    catchError((error) => {
                        throw error;
                    }),
                ),
            );

            console.log('data', data);
            console.log('data.data.validateEmployeeIds', data.data.validateEmployeeIds)

            if (!data || !data.data) {
                console.log('No data returned');
                return false;
            }

            return data.data.validateEmployeeIds;

        } catch (error) {
            console.error('Error querying employees:', error.message);
            return false;
        }
    }

    private async validateInput(input: UpdatePoApproverInput): Promise<void> {
        if (input.status && !isValidApprovalStatus(input.status)) {
            throw new BadRequestException('Invalid status value');
        }

        if (input.status && input.status === APPROVAL_STATUS.CANCELLED) {
            throw new BadRequestException('Cancelled status not allowed');
        }

        const employeeIds = []

        if (input.approver_id) {
            employeeIds.push(input.approver_id)
        }

        if (input.approver_proxy_id) {
            employeeIds.push(input.approver_proxy_id)
        }

        if (employeeIds.length > 0) {
            const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)

            if (!isValidEmployeeIds) {
                throw new BadRequestException("One or more employee id is invalid")
            }
        }
    }

}
