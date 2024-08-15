import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CanvassService } from '../canvass/canvass.service';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, SPR, SPRApprover } from 'apps/warehouse/prisma/generated/client';
import { CreateSprInput } from './dto/create-spr.input';
import { APPROVAL_STATUS } from '../__common__/types';
import { AuthUser } from '../__common__/auth-user.entity';
import { UpdateSprInput } from './dto/update-spr.input';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { WarehouseCancelResponse, WarehouseRemoveResponse } from '../__common__/classes';
import { SPRsResponse } from './entities/sprs-response.entity';
import { getDateRange, isAdmin, isNormalUser } from '../__common__/helpers';
import { UpdateSprByBudgetOfficerInput } from './dto/update-spr-by-budget-officer.input';
import { CreateSprApproverSubInput } from './dto/create-spr-approver.sub.input';
import { DB_ENTITY } from '../__common__/constants';

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

    // When creating spr, pendings should also be created for each approver
    async create(input: CreateSprInput): Promise<SPR> {

        this.logger.log('create()')

        console.log('input', input);

        if (!(await this.canCreate(input))) {
            throw new Error('Failed to create SPR. Please try again')
        }

        const sprNumber = await this.getLatestSprNumber()

        const createdBy = this.authUser.user.username

        const data: Prisma.SPRCreateInput = {
            created_by: createdBy,
            spr_number: sprNumber,
            date_requested: new Date(),
            classification_id: input.classification_id ?? null,
            notes: input.notes ?? null,
            supervisor_id: input.supervisor_id,
            canvass: { connect: { id: input.canvass_id } },
            vehicle: { connect: { id: input.vehicle_id } },
            spr_approvers: {
                create: input.approvers.map(i => {
                    return {
                        approver_id: i.approver_id,
                        label: i.label,
                        order: i.order,
                        notes: '',
                        status: APPROVAL_STATUS.PENDING,
                        is_supervisor: i.is_supervisor,
                        created_by: createdBy
                    }
                })
            }
        }

        const queries = []

        const createSprQuery = this.prisma.sPR.create({
            data,
            include: this.includedFields
        })

        queries.push(createSprQuery)

        const createPendingQuery = this.getCreatePendingQuery(input.approvers, sprNumber)

        queries.push(createPendingQuery)

        const result = await this.prisma.$transaction(queries)

        console.log('SPR created successfully');
        console.log('Pending with associated approver created successfully');

        return result[0]
        
    }

    private getCreatePendingQuery(approvers: CreateSprApproverSubInput[], sprNumber: string) {

        const firstApprover = approvers.reduce((min, obj) => {
            return obj.order < min.order ? obj : min;
        }, approvers[0]);

        const data = {
            approver_id: firstApprover.approver_id,
            reference_number: sprNumber,
            reference_table: DB_ENTITY.SPR,
            description: `SPR no. ${sprNumber}`
        }

        return this.prisma.pending.create({ data })

    }

    async update(id: string, input: UpdateSprInput): Promise<SPR> {

        this.logger.log('update()')

        const existingItem = await this.prisma.sPR.findUnique({
            where: { id },
            include: {
                spr_approvers: true
            }
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

        const queries = []

        const updateSprQuery = this.prisma.sPR.update({
            data,
            where: { id },
            include: this.includedFields
        })

        queries.push(updateSprQuery)

        // if supervisor is updated
        if(input.supervisor_id) {

            const isNewSupervisor = input.supervisor_id !== existingItem.supervisor_id

            // update supervisor in rv approver as well
            if(isNewSupervisor) {

                const existingSupervisor = existingItem.spr_approvers.find(i => i.approver_id === existingItem.supervisor_id && !!i.is_supervisor)
    
                if(!existingSupervisor) {
                    throw new NotFoundException('Existing supervisor not found with id of ' + existingItem.supervisor_id)
                }

                console.log('Updating SPR Approver supervisor');

                const updateSprApproverQuery = this.prisma.sPRApprover.update({
                    where: {
                        id: existingSupervisor.id
                    },
                    data: {
                        approver_id: input.supervisor_id
                    }
                })

                queries.push(updateSprApproverQuery)

            }

        }

        const result = await this.prisma.$transaction(queries)

        this.logger.log('Successfully updated SPR');

        return result[0]


        // const updated = await this.prisma.sPR.update({
        //     data,
        //     where: { id },
        //     include: this.includedFields
        // })

        // this.logger.log('Successfully updated SPR')

        // return updated

    }

    async cancel(id: string): Promise<WarehouseCancelResponse> {

        this.logger.log('cancel()')

        const existingItem = await this.prisma.sPR.findUnique({
            where: { id },
            include: {
                canvass: true
            }
        })

        if (!existingItem) {
            throw new NotFoundException('SPR not found')
        }

        if (!existingItem.canvass) {
            throw new Error('SPR is not associated with a Canvass');
        }

        if (!this.canAccess(existingItem)) {
            throw new ForbiddenException('Only Admin and Owner can cancel this record!')
        }

        const updated = await this.prisma.sPR.update({
            data: {
                cancelled_at: new Date(),
                cancelled_by: this.authUser.user.username,
                canvass: {
                    disconnect: true
                }
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
            whereCondition = { ...whereCondition, canvass: { requested_by_id: requested_by_id } }
        }
        
        whereCondition.cancelled_at = {
            equals: null,
        }

        const [items, totalItems] = await this.prisma.$transaction([
            this.prisma.sPR.findMany({
                include: this.includedFields,
                where: whereCondition,
                orderBy: {
                    spr_number: 'desc'
                },
                skip,
                take: pageSize,
            }),
            this.prisma.sPR.count({
                where: whereCondition,
            }),
        ]);

        return {
            data: items,
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / pageSize),
        };
    }

    async findSprsBySprNumber(sprNumber: string, includeDetails: boolean = false) {

		const trimmedSprNumber = sprNumber.trim(); 

        let selectClause;
        if (includeDetails) {
            selectClause = { 
                id: true,
                spr_number: true, 
                canvass: {
                    include: {
                        canvass_items: {
                            include: {
                                unit: true,
                            }
                        }
                    }
                }
            }; 
        } else {
            selectClause = { spr_number: true };
        }

        const items = await this.prisma.sPR.findMany({
            select: selectClause,
            where: {
                spr_number: {
                    startsWith: trimmedSprNumber
                },
                cancelled_at: null
            },
            orderBy: {
                spr_number: 'desc'
            },
            take: 10,
        });

        return items;
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

    async updateClassificationByBudgetOfficer(sprId: string, payload: UpdateSprByBudgetOfficerInput): Promise<WarehouseRemoveResponse> {

        console.log('updateClassificationByBudgetOfficer()', sprId, payload)

        if (!this.authUser.user.user_employee) {
            throw new BadRequestException('this.authUser.user.user_employee is undefined')
        }

        if (!this.authUser.user.user_employee.employee.is_budget_officer) {
            throw new ForbiddenException('Only budget officer can update')
        }

        const { classification_id, notes, status } = payload

        const item = await this.prisma.sPR.findUnique({
            where: { id: sprId }
        })

        if (!item) {
            throw new NotFoundException('SPR not found with ID ' + sprId)
        }

        const isValidClassificationId = await this.isClassificationExist(classification_id, this.authUser)

        if (!isValidClassificationId) {
            throw new NotFoundException('Classification ID not valid')
        }

        const queries = []

        const updateSprClassificationIdQuery = this.prisma.sPR.update({
            where: { id: sprId },
            data: {
                classification_id
            }
        })

        queries.push(updateSprClassificationIdQuery)

        const approver_id = this.authUser.user.user_employee.employee.id

        const sprApprover = await this.prisma.sPRApprover.findFirst({
            where: {
                spr_id: sprId,
                approver_id
            }
        })

        if (!sprApprover) {
            throw new NotFoundException(`SPR Approver not found with spr_id of ${sprId} and approver_id of ${approver_id} `)
        }

        const updateSprApproverQuery = this.prisma.sPRApprover.update({
            where: { id: sprApprover.id },
            data: {
                notes,
                status,
                date_approval: new Date(),
                updated_by: this.authUser.user.username
            }
        })

        queries.push(updateSprApproverQuery)

        const result = await this.prisma.$transaction(queries)

        console.log('result', result)
        console.log('Successfully updated spr classification and spr approver')

        return {
            success: true,
            msg: 'Successfully updated spr classification and spr approver'
        }

    }

    async canUpdateForm(sprId: string): Promise<Boolean> {

        if (isAdmin(this.authUser)) {
            return true
        }

        const spr = await this.prisma.sPR.findUnique({
            where: {
                id: sprId
            },
            select: {
                created_by: true,
                spr_approvers: true
            }
        })

        const isOwner = spr.created_by === this.authUser.user.username

        if (!isOwner) {
            return false
        }

        const hasApproval = spr.spr_approvers.find(i => i.status !== APPROVAL_STATUS.PENDING)

        if (hasApproval) {
            return false
        }

        return true

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
