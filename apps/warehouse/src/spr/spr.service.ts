import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CanvassService } from '../canvass/canvass.service';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, SPR, SPRApprover } from 'apps/warehouse/prisma/generated/client';
import { CreateSprInput } from './dto/create-spr.input';
import { APPROVAL_STATUS, Role } from '../__common__/types';
import { AuthUser } from '../__common__/auth-user.entity';
import { UpdateSprInput } from './dto/update-spr.input';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { WarehouseCancelResponse } from '../__common__/classes';
import { SPRsResponse } from './entities/sprs-response.entity';
import * as moment from 'moment';
import { getDateRange, isAdmin, isNormalUser } from '../__common__/helpers';

@Injectable()
export class SprService {

    private readonly logger = new Logger(SprService.name);
    private authUser: AuthUser

    // fields that are included when returning a data from db
    private includedFields = {
        canvass: {
            include: {
                canvass_items: {
                    include: {
                        unit: true,
                        brand: true
                    }
                }
            }
        },
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
        },
        vehicle: true
    }

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
        private readonly canvassService: CanvassService
    ) { }

    setAuthUser(authUser: AuthUser) {
        this.authUser = authUser
    }

    async create(input: CreateSprInput): Promise<SPR> {

        this.logger.log('create()')

        if (!(await this.canCreate(input))) {
            throw new Error('Failed to create SPR. Please try again')
        }

        const sprNumber = await this.getLatestSprNumber()
        const today = moment().format('MM/DD/YYYY')

        const createdBy = this.authUser.user.username

        // data to be inserted in database
        const data: Prisma.SPRCreateInput = {
            created_by: createdBy,
            spr_number: sprNumber,
            date_requested: new Date(today),
            canvass: { connect: { id: input.canvass_id } },
            vehicle: { connect: { id: input.vehicle_id } },
            classification_id: input.classification_id ?? null,
            supervisor_id: input.supervisor_id,
            notes: input.notes ?? null,
            spr_approvers: {
                create: input.approvers.map(i => {
                    return {
                        approver_id: i.approver_id,
                        label: i.label,
                        order: i.order,
                        notes: '',
                        status: APPROVAL_STATUS.PENDING,
                        created_by: createdBy
                    }
                })
            }
        }

        const created = await this.prisma.sPR.create({
            data,
            include: this.includedFields
        })

        this.logger.log('Successfully created SPR')

        return created

    }

    async update(id: string, input: UpdateSprInput): Promise<SPR> {

        this.logger.log('update()')

        const existingItem = await this.prisma.sPR.findUnique({
            where: { id }
        })

        if (!existingItem) {
            throw new NotFoundException('SPR not found')
        }

        if (!this.canAccess(existingItem)) {
            throw new ForbiddenException('Only Admin and Owner can update this record!')
        }

        if (!(await this.canUpdate(input, existingItem))) {
            throw new Error('Failed to update SPR. Please try again')
        }

        const data: Prisma.SPRUpdateInput = {
            updated_by: this.authUser.user.username,
            vehicle: input.vehicle_id ? { connect: { id: input.vehicle_id } } : { connect: { id: existingItem.vehicle_id } },
            classification_id: input.classification_id ?? existingItem.classification_id,
            supervisor_id: input.supervisor_id ?? existingItem.supervisor_id,
            notes: input.notes ?? existingItem.notes,
        }

        const updated = await this.prisma.sPR.update({
            data,
            where: { id },
            include: this.includedFields
        })

        this.logger.log('Successfully updated SPR')

        return updated

    }

    async cancel(id: string): Promise<WarehouseCancelResponse> {

        this.logger.log('cancel()')

        const existingItem = await this.prisma.sPR.findUnique({
            where: { id }
        })

        if (!existingItem) {
            throw new NotFoundException('SPR not found')
        }

        if (!this.canAccess(existingItem)) {
            throw new ForbiddenException('Only Admin and Owner can cancel this record!')
        }

        const updated = await this.prisma.sPR.update({
            data: {
                cancelled_at: new Date(),
                cancelled_by: this.authUser.user.username
            },
            where: { id }
        })

        this.logger.log('Successfully cancelled SPR')

        return {
            success: true,
            msg: 'Successfully cancelled SPR',
            cancelled_at: updated.cancelled_at,
            cancelled_by: updated.cancelled_by
        }

    }

    async findOne(id: string): Promise<SPR | null> {
        const item = await this.prisma.sPR.findUnique({
            include: this.includedFields,
            where: { id }
        })

        if (!item) {
            throw new NotFoundException('SPR not found')
        }

        return item
    }

    async findByRcNumber(rc_number: string): Promise<SPR | null> {
        const item = await this.prisma.sPR.findFirst({
            include: this.includedFields,
            where: {
                canvass: {
                    rc_number
                }
            }
        })

        if (!item) {
            throw new NotFoundException('SPR not found')
        }

        return item
    }

    async findBySprNumber(spr_number: string): Promise<SPR | null> {
        const item = await this.prisma.sPR.findUnique({
            include: this.includedFields,
            where: { spr_number }
        })

        if (!item) {
            throw new NotFoundException('SPR not found')
        }

        return item
    }

    async findAll(page: number, pageSize: number, date_requested?: string, requested_by_id?: string): Promise<SPRsResponse> {
        const skip = (page - 1) * pageSize;

        let whereCondition: any = {};

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
            whereCondition = { canvass: { requested_by_id: requested_by_id } }
        }

        const items = await this.prisma.sPR.findMany({
            include: this.includedFields,
            where: whereCondition,
            orderBy: {
                spr_number: 'desc'
            },
            skip,
            take: pageSize,
        });

        const totalItems = await this.prisma.sPR.count({
            where: whereCondition,
        });

        return {
            data: items,
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / pageSize),
        };
    }

    async findSprNumbers(sprNumber: string): Promise<{ spr_number: string; }[]> {

        const arrayOfSprNumbers = await this.prisma.sPR.findMany({
            select: {
                spr_number: true
            },
            where: {
                spr_number: {
                    contains: sprNumber.trim().toLowerCase(),
                    mode: 'insensitive',
                },
            },
            take: 5,
        });

        return arrayOfSprNumbers;
    }

    async getStatus(id: string): Promise<APPROVAL_STATUS> {

        const approvers = await this.prisma.sPRApprover.findMany({
            where: {
                spr_id: id,
                deleted_at: null
            }
        })

        const hasDisapproved = approvers.find(i => i.status === APPROVAL_STATUS.DISAPPROVED)

        if (hasDisapproved) {
            return APPROVAL_STATUS.DISAPPROVED
        }

        const hasPending = approvers.find(i => i.status === APPROVAL_STATUS.PENDING)

        if (hasPending) {
            return APPROVAL_STATUS.PENDING
        }

        return APPROVAL_STATUS.APPROVED

    }

    async isReferenced(sprId: string): Promise<Boolean> {

        const meqs = await this.prisma.mEQS.findUnique({
            where: { spr_id: sprId }
        })

        if (meqs) return true

        return false

    }

    private async getLatestSprNumber(): Promise<string> {
        const currentYear = new Date().getFullYear().toString().slice(-2);

        const latestItem = await this.prisma.sPR.findFirst({
            where: { spr_number: { startsWith: currentYear } },
            orderBy: { spr_number: 'desc' },
        });

        if (latestItem) {
            const latestNumericPart = parseInt(latestItem.spr_number.slice(-5), 10);
            const newNumericPart = latestNumericPart + 1;
            const newRcNumber = `${currentYear}-${newNumericPart.toString().padStart(5, '0')}`;
            return newRcNumber;
        } else {
            // If no existing rc_number with the current year prefix, start with '00001'
            return `${currentYear}-00001`;
        }
    }

    private async isClassificationExist(classification_id: string, authUser: AuthUser): Promise<boolean> {

        this.logger.log('isClassificationExist', classification_id)

        // console.log('this.authUser', this.authUser)

        const query = `
            query{
                classification(id: "${classification_id}") {
                    id
                }
            }
        `;

        const { data } = await firstValueFrom(
            this.httpService.post(process.env.API_GATEWAY_URL,
                { query },
                {
                    headers: {
                        Authorization: authUser.authorization,
                        'Content-Type': 'application/json'
                    }
                }
            ).pipe(
                catchError((error) => {
                    throw error
                }),
            ),
        );

        console.log('data', data)

        if (!data || !data.data || !data.data.classification) {
            console.log('classification not found')
            return false
        }
        const classification = data.data.classification
        console.log('classification', classification)
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

    private async canCreate(input: CreateSprInput): Promise<boolean> {

        if (input.classification_id) {
            const isValidClassificationId = await this.isClassificationExist(input.classification_id, this.authUser)

            if (!isValidClassificationId) {
                throw new NotFoundException('Classification ID not valid')
            }
        }

        const employeeIds: string[] = input.approvers.map(({ approver_id }) => approver_id);

        this.logger.log('employeeIds', employeeIds)

        const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)

        if (!isValidEmployeeIds) {
            throw new BadRequestException("One or more employee id is invalid")
        }

        const canvass = await this.prisma.canvass.findUnique({
            where: { id: input.canvass_id }
        })

        if (!canvass) {
            throw new NotFoundException('Canvass not found with id: ' + input.canvass_id)
        }

        const isCanvassReferenced = await this.canvassService.isReferenced((canvass.id))

        if (isCanvassReferenced) {
            throw new BadRequestException('Canvass already been referenced with ID: ' + input.canvass_id)
        }

        return true

    }

    private async canUpdate(input: UpdateSprInput, existingItem: SPR): Promise<boolean> {

        // validates if there is already an approver who take an action
        if (isNormalUser(this.authUser)) {

            console.log('is normal user')

            const approvers = await this.prisma.sPRApprover.findMany({
                where: {
                    spr_id: existingItem.id
                }
            })

            // used to indicate whether there is at least one approver whose status is not pending.
            const isAnyNonPendingApprover = this.isAnyNonPendingApprover(approvers)

            if (isAnyNonPendingApprover) {
                throw new BadRequestException(`Unable to update SPR. Can only update if all approver's status is pending`)
            }
        }

        if (input.classification_id) {
            const isValidClassificationId = await this.isClassificationExist(input.classification_id, this.authUser)

            if (!isValidClassificationId) {
                throw new NotFoundException('Classification ID not valid')
            }
        }

        const employeeIds = []

        if (input.supervisor_id) {
            employeeIds.push(input.supervisor_id)
        }

        if (employeeIds.length > 0) {

            const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)

            if (!isValidEmployeeIds) {
                throw new NotFoundException('One or more employee IDs is not valid')
            }

        }

        return true

    }

    // used to indicate whether there is at least one approver whose status is not pending.
    private isAnyNonPendingApprover(approvers: SPRApprover[]): boolean {

        for (let approver of approvers) {

            if (approver.status !== APPROVAL_STATUS.PENDING) {

                return true

            }

        }

        return false

    }

    private canAccess(item: SPR): boolean {

        if (isAdmin(this.authUser)) return true

        const isOwner = item.created_by === this.authUser.user.username

        if (isOwner) return true

        return false

    }

}
