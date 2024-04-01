
/*

    if last approver approve then:

    1. Create item transaction per rr_item
    2. Update item quantity per item transaction

    Note: Use db transaction

*/


import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRrApproverInput } from './dto/create-rr-approver.input';
import { UpdateRrApproverInput } from './dto/update-rr-approver.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, RRApprover } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS } from '../__common__/types';
import { AuthUser } from '../__common__/auth-user.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { isAdmin, isValidApprovalStatus } from '../__common__/helpers';
import { UpdateRrOrderResponse } from './entities/update-rr-order-response.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RrApproverStatusUpdated } from './events/rr-approver-status-updated.event';

@Injectable()
export class RrApproverService {

    private readonly logger = new Logger(RrApproverService.name);
    private authUser: AuthUser
    private includedFields = {
        rr: {
            include: {
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
        }
    }

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
        private eventEmitter: EventEmitter2
    ) { }

    setAuthUser(authUser: AuthUser) {
        this.authUser = authUser
    }

    async create(input: CreateRrApproverInput): Promise<RRApprover> {

        const employeeIds = []

        employeeIds.push(input.approver_id)

        if (employeeIds.length > 0) {
            const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)

            if (!isValidEmployeeIds) {
                throw new BadRequestException("One or more employee id is invalid")
            }
        }

        const data: Prisma.RRApproverCreateInput = {
            rr: { connect: { id: input.rr_id } },
            approver_id: input.approver_id,
            label: input.label,
            order: input.order,
            status: APPROVAL_STATUS.PENDING,
            notes: '',
            created_by: this.authUser.user.username
        }

        const created = await this.prisma.rRApprover.create({
            data,
            include: this.includedFields
        })

        this.logger.log('Successfully created rRApprover')

        return created
    }

    // async findAll(): Promise<RRApprover[]> {
    //     return await this.prisma.rRApprover.findMany({
    //         include: this.includedFields,
    //         where: { is_deleted: false },
    //     })
    // }

    async findOne(id: string): Promise<RRApprover | null> {

        const item = await this.prisma.rRApprover.findUnique({
            where: { id },
            include: this.includedFields
        })

        if (!item) {
            throw new NotFoundException('RR Approver not found')
        }

        return item

    }

    async findByRrId(rrId: string): Promise<RRApprover[]> {

        this.logger.log('findByRrId()', rrId)

        return await this.prisma.rRApprover.findMany({
            // include: this.includedFields,
            where: {
                deleted_at: null,
                rr_id: rrId
            },
            orderBy: {
                order: 'asc'
            }
        })
    }

    async findByRrNumber(rrNumber: string): Promise<RRApprover[]> {
        return await this.prisma.rRApprover.findMany({
            include: this.includedFields,
            where: {
                deleted_at: null,
                rr: {
                    rr_number: rrNumber
                }
            },
            orderBy: {
                order: 'asc'
            }
        })
    }

    async update(id: string, input: UpdateRrApproverInput): Promise<RRApprover> {
        this.logger.log('update()')

        const existingItem = await this.findOne(id)

        const isApprover = this.authUser.user.user_employee.id === existingItem.approver_id

        if (!isAdmin(this.authUser) && !isApprover) {
            throw new ForbiddenException('Only Admin and Approver can update')
        }

        await this.validateInput(input)

        let dateApproval = new Date(input.date_approval)

        if (input.status && input.status === APPROVAL_STATUS.PENDING) {
            dateApproval = null
        } else if (!dateApproval) {
            dateApproval = existingItem.date_approval
        }

        const data: Prisma.RRApproverUpdateInput = {
            approver_id: input.approver_id ?? existingItem.approver_id,
            date_approval: dateApproval,
            notes: input.notes ?? existingItem.notes,
            status: input.status ?? existingItem.status,
            label: input.label ?? existingItem.label,
            order: input.order ?? existingItem.order,
            updated_by: this.authUser.user.username
        }

        const updated = await this.prisma.rRApprover.update({
            data,
            where: { id },
            include: this.includedFields,
        });
        this.logger.log('Successfully updated RR Approver');

        // emit event if status is updated
        if (input.status !== existingItem.status) {
            console.log('status updated...')
            this.eventEmitter.emit('rr-approver-status.updated', new RrApproverStatusUpdated(id))
        }

        console.log('returned rrApprover to client')

        return updated;
    }

    async remove(id: string): Promise<WarehouseRemoveResponse> {

        const existingItem = await this.findOne(id)

        await this.prisma.rRApprover.update({
            where: { id },
            data: {
                deleted_at: new Date(),
                deleted_by: this.authUser.user.username
            }
        })

        return {
            success: true,
            msg: "RR Approver successfully deleted"
        }

    }

    async updateManyOrders(inputs: { id: string; order: number }[]): Promise<UpdateRrOrderResponse> {
        try {

            const queries = []

            for (let input of inputs) {

                const updateQuery = this.prisma.rRApprover.update({
                    where: { id: input.id },
                    data: { order: input.order },
                    select: {
                        rr_id: true
                    }
                })

                queries.push(updateQuery)

            }

            const result = await this.prisma.$transaction(queries)

            const rr = result[0] as RRApprover

            console.log('rr', rr)

            const approvers = await this.findByRrId(rr.rr_id)

            return {
                success: true,
                approvers: approvers
            };
        } catch (error) {
            this.logger.error(error);
            return { success: false, approvers: [] };
        }
    }

    async forEmployeePendingApprovals(employeeId: string): Promise<RRApprover[]> {
        return await this.prisma.rRApprover.findMany({
            where: {
                approver_id: employeeId,
                status: APPROVAL_STATUS.PENDING,
                deleted_at: null
            },
            orderBy: {
                created_at: 'asc'
            },
            include: {
                rr: {
                    include: {
                        rr_approvers: {
                            where: {
                                deleted_at: null
                            },
                            orderBy: {
                                order: 'asc'
                            }
                        }
                    }
                }
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

    private async validateInput(input: UpdateRrApproverInput): Promise<void> {
        if (input.status && !isValidApprovalStatus(input.status)) {
            throw new BadRequestException('Invalid status value');
        }

        if (input.status && input.status === APPROVAL_STATUS.CANCELLED) {
            throw new BadRequestException('Cancelled status not allowed');
        }

        if (input.approver_id) {
            await this.validateEmployeeExistence(input.approver_id, 'Approver ID');
        }
    }

    private async validateEmployeeExistence(employeeId: string, errorMessage: string): Promise<void> {
        const isValidEmployeeId = await this.areEmployeesExist([employeeId], this.authUser);
        if (!isValidEmployeeId) {
            throw new NotFoundException(`${errorMessage} not valid`);
        }
    }

}
