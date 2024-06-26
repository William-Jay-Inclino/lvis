import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../__prisma__/prisma.service';
import { CreateCanvassInput } from './dto/create-canvass.input';
import { Canvass, Prisma } from 'apps/warehouse/prisma/generated/client';
import { AuthUser } from '../__common__/auth-user.entity';
import { UpdateCanvassInput } from './dto/update-canvass.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CanvassesResponse } from './entities/canvasses-response.entity';
import { FindOneResponse } from './entities/types';
import * as moment from 'moment';
import { getDateRange, isAdmin } from '../__common__/helpers';
import { APPROVAL_STATUS } from '../__common__/types';

@Injectable()
export class CanvassService {

    private readonly logger = new Logger(CanvassService.name);
    private authUser: AuthUser
    private includedFields = {
        canvass_items: {
            include: {
                unit: true,
                brand: true,
                item: true
            }
        },
        rv: {
            include: {
                meqs: {
                    include: {
                        meqs_suppliers: {
                            include: {
                                po: {
                                    include: {
                                        rrs: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        jo: {
            include: {
                meqs: {
                    include: {
                        meqs_suppliers: {
                            include: {
                                po: {
                                    include: {
                                        rrs: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        spr: {
            include: {
                meqs: {
                    include: {
                        meqs_suppliers: {
                            include: {
                                po: {
                                    include: {
                                        rrs: true
                                    }
                                }
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
    ) { }

    setAuthUser(authUser: AuthUser) {
        this.authUser = authUser
    }

    async create(input: CreateCanvassInput): Promise<Canvass> {

        this.logger.log('create()', input)

        const isValidRequestedById = await this.areEmployeesExist([input.requested_by_id], this.authUser)

        if (!isValidRequestedById) {
            throw new NotFoundException('Requested by ID not valid')
        }

        const rcNumber = await this.getLatestRcNumber()
        const today = moment().format('MM/DD/YYYY')

        const createdBy = this.authUser.user.username

        const data: Prisma.CanvassCreateInput = {
            rc_number: rcNumber,
            date_requested: new Date(today),
            purpose: input.purpose,
            notes: input.notes,
            requested_by_id: input.requested_by_id,
            created_by: createdBy,
            canvass_items: {
                create: input.canvass_items.map((item) => {
                    return {
                        brand: item.brand_id ? { connect: { id: item.brand_id } } : undefined,
                        unit: item.unit_id ? { connect: { id: item.unit_id } } : undefined,
                        item: item.item_id ? { connect: { id: item.item_id } } : undefined,
                        description: item.description,
                        quantity: item.quantity,
                        created_by: createdBy
                    }
                })
            }
        }

        const created = await this.prisma.canvass.create({
            data,
        })

        this.logger.log('Successfully created canvass')

        return created

    }

    async update(id: string, input: UpdateCanvassInput): Promise<Canvass> {
        this.logger.log('update()', input);

        const existingItem = await this.findOne(id);

        if (!(await this.canUpdate(existingItem.id))) {
            throw new ForbiddenException('Only Admin and Owner can update this record. Cannot also update if rv/spr/jo has approval for owners only!')
        }

        if (input.requested_by_id) {
            const isValidRequestedById = await this.areEmployeesExist([input.requested_by_id], this.authUser);

            if (!isValidRequestedById) {
                throw new NotFoundException('Requested by ID not found');
            }
        }

        const data: Prisma.CanvassUpdateInput = {
            purpose: input.purpose ?? existingItem.purpose,
            notes: input.notes ?? existingItem.notes,
            requested_by_id: input.requested_by_id ?? existingItem.requested_by_id,
            updated_by: this.authUser.user.username,
        };

        const updated = await this.prisma.canvass.update({
            data,
            where: { id },
        });

        this.logger.log('Successfully updated canvass');

        return updated
    }

    async findAll(page: number, pageSize: number, date_requested?: string, requested_by_id?: string): Promise<CanvassesResponse> {

        console.log('findAll')

        const skip = (page - 1) * pageSize;

        let whereCondition: any = {
            deleted_at: null,
        };

        if (date_requested) {
            const { startDate, endDate } = getDateRange(date_requested);
            console.log('startDate', startDate);
            console.log('endDate', endDate)

            whereCondition.date_requested = {
                gte: startDate,
                lte: endDate,
            };
        }

        if (requested_by_id) {
            whereCondition.requested_by_id = {
                equals: requested_by_id,
            };
        }

        const items = await this.prisma.canvass.findMany({
            include: this.includedFields,
            where: whereCondition,
            orderBy: {
                rc_number: 'desc'
            },
            skip,
            take: pageSize,
        });

        const totalItems = await this.prisma.canvass.count({
            where: whereCondition
        });

        return {
            data: items,
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / pageSize),
        };
    }

    async findOne(id: string): Promise<FindOneResponse> {

        this.logger.log('findOne()', id)

        const item = await this.prisma.canvass.findUnique({
            include: this.includedFields,
            where: { id }
        })

        if (!item) {
            throw new NotFoundException('Canvass not found')
        }

        return item

    }

    async findByRcNumber(rc_number: string): Promise<Canvass> {

        this.logger.log('findByRcNumber()', rc_number)

        const item = await this.prisma.canvass.findUnique({
            include: this.includedFields,
            where: { rc_number }
        })

        if (!item) {
            throw new NotFoundException('Canvass not found')
        }

        return item

    }

    async findCanvassesByRcNumber(rcNumber: string, includeDetails: boolean = false) {

		const trimmedRcNumber = rcNumber.trim(); 

        let selectClause;
        if (includeDetails) {
            selectClause = { 
                id: true,
                rc_number: true, 
                purpose: true,
                notes: true,
                requested_by_id: true
            }; 
        } else {
            selectClause = { rc_number: true };
        }

        const items = await this.prisma.canvass.findMany({
            select: selectClause,
            where: {
                rc_number: {
                    startsWith: trimmedRcNumber
                },
                deleted_at: null
            },
            orderBy: {
                rc_number: 'desc'
            },
            take: 10,
        });

        return items;
    }

    private async getLatestRcNumber(): Promise<string> {
        const currentYear = new Date().getFullYear().toString().slice(-2);

        const latestItem = await this.prisma.canvass.findFirst({
            where: { rc_number: { startsWith: currentYear } },
            orderBy: { rc_number: 'desc' },
        });

        if (latestItem) {
            const latestNumericPart = parseInt(latestItem.rc_number.slice(-5), 10);
            const newNumericPart = latestNumericPart + 1;
            const newRcNumber = `${currentYear}-${newNumericPart.toString().padStart(5, '0')}`;
            return newRcNumber;
        } else {
            // If no existing rc_number with the current year prefix, start with '00001'
            return `${currentYear}-00001`;
        }
    }

    async forEmployee(employeeId: string): Promise<Canvass[]> {
        return await this.prisma.canvass.findMany({
            where: {
                requested_by_id: employeeId,
                deleted_at: null
            }
        })
    }

    async remove(id: string): Promise<WarehouseRemoveResponse> {

        const existingItem = await this.findOne(id)

        if (!this.canAccess(existingItem)) {
            throw new ForbiddenException('Only Admin and Owner can remove this record!')
        }

        await this.prisma.canvass.update({
            where: { id },
            data: {
                deleted_at: new Date(),
                deleted_by: this.authUser.user.username
            }
        })

        return {
            success: true,
            msg: "Canvass successfully deleted"
        }

    }

    async isReferenced(canvassId: string): Promise<Boolean> {

        const rv = await this.prisma.rV.findUnique({
            where: { canvass_id: canvassId }
        })

        if (rv) return true

        const spr = await this.prisma.sPR.findUnique({
            where: { canvass_id: canvassId }
        })

        if (spr) return true

        const jo = await this.prisma.jO.findUnique({
            where: { canvass_id: canvassId }
        })

        if (jo) return true


        return false

    }

    async isReferencedInRR(canvassId: string): Promise<Boolean> {

        const rr = await this.prisma.rR.findFirst({
            select: {
                id: true
            },
            where: {
                po: {
                    meqs_supplier: {
                        meqs: {
                            OR: [
                                {
                                    rv: {
                                        canvass_id: canvassId
                                    }
                                },
                                {
                                    spr: {
                                        canvass_id: canvassId
                                    }
                                },
                                {
                                    jo: {
                                        canvass_id: canvassId
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        })

        return !!rr

    }

    // cannot update if not owner
    // can only update canvass if admin AND if either rvApprovers, sprApprovers, or rvApprovers all pending 
    async canUpdate(canvassId: string): Promise<Boolean> {

        if (isAdmin(this.authUser)) {
            return true
        }

        const canvass = await this.prisma.canvass.findUnique({
            where: { id: canvassId },
            select: {
                created_by: true,
                rv: {
                    select: {
                        rv_approvers: true
                    }
                },
                spr: {
                    select: {
                        spr_approvers: true
                    }
                },
                jo: {
                    select: {
                        jo_approvers: true
                    }
                }
            }
        })

        if (!canvass) {
            throw new NotFoundException('Canvass not found with id of ' + canvassId)
        }

        const isOwner = canvass.created_by === this.authUser.user.username

        if (!isOwner) {
            return false
        }

        if (canvass.rv) {
            const hasApproverAction = canvass.rv.rv_approvers.find(i => i.status !== APPROVAL_STATUS.PENDING)

            if (hasApproverAction) {
                return false
            }
        }

        if (canvass.spr) {
            const hasApproverAction = canvass.spr.spr_approvers.find(i => i.status !== APPROVAL_STATUS.PENDING)

            if (hasApproverAction) {
                return false
            }
        }

        if (canvass.jo) {
            const hasApproverAction = canvass.jo.jo_approvers.find(i => i.status !== APPROVAL_STATUS.PENDING)

            if (hasApproverAction) {
                return false
            }
        }


        return true

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

    private canAccess(item: Canvass): boolean {

        if (isAdmin(this.authUser)) return true

        const isOwner = item.created_by === this.authUser.user.username

        if (isOwner) return true

        return false

    }

}
