import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CanvassService } from '../canvass/canvass.service';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, RV, RVApprover } from 'apps/warehouse/prisma/generated/client';
import { CreateRvInput } from './dto/create-rv.input';
import { APPROVAL_STATUS } from '../__common__/types';
import { AuthUser } from '../__common__/auth-user.entity';
import { UpdateRvInput } from './dto/update-rv.input';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { WarehouseCancelResponse, WarehouseRemoveResponse } from '../__common__/classes';
import { RVsResponse } from './entities/rvs-response.entity';
import { getDateRange, isAdmin, isNormalUser } from '../__common__/helpers';
import { UpdateRvByBudgetOfficerInput } from './dto/update-rv-by-budget-officer.input';
import { CreateRvApproverSubInput } from './dto/create-rv-approver.sub.input';
import { DB_ENTITY } from '../__common__/constants';

@Injectable()
export class RvService {

    private readonly logger = new Logger(RvService.name);
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
        }
    }

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
        private readonly canvassService: CanvassService,
    ) { }

    setAuthUser(authUser: AuthUser) {
        this.authUser = authUser
    }

    // When creating rv, pendings should also be created for each approver
    async create(input: CreateRvInput): Promise<RV> {

        this.logger.log('create()')

        console.log('input', input);

        if (!(await this.canCreate(input))) {
            throw new Error('Failed to create RV. Please try again')
        }

        const rvNumber = await this.getLatestRvNumber()

        const createdBy = this.authUser.user.username

        const data: Prisma.RVCreateInput = {
            created_by: createdBy,
            rv_number: rvNumber,
            date_requested: new Date(),
            classification_id: input.classification_id ?? null,
            work_order_no: input.work_order_no ?? null,
            notes: input.notes ?? null,
            work_order_date: input.work_order_date ? new Date(input.work_order_date) : null,
            supervisor_id: input.supervisor_id,
            canvass: { connect: { id: input.canvass_id } },
            rv_approvers: {
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

        const createRvQuery = this.prisma.rV.create({
            data,
            include: this.includedFields
        })

        queries.push(createRvQuery)

        const createPendingQuery = this.getCreatePendingQuery(input.approvers, rvNumber)

        queries.push(createPendingQuery)

        const result = await this.prisma.$transaction(queries)

        console.log('RV created successfully');
        console.log('Pending with associated approver created successfully');

        return result[0]
        
    }

    private getCreatePendingQuery(approvers: CreateRvApproverSubInput[], rvNumber: string) {

        const firstApprover = approvers.reduce((min, obj) => {
            return obj.order < min.order ? obj : min;
        }, approvers[0]);

        const data = {
            approver_id: firstApprover.approver_id,
            reference_number: rvNumber,
            reference_table: DB_ENTITY.RV,
            description: `RV no. ${rvNumber}`
        }

        return this.prisma.pending.create({ data })

    }

    // RV supervisor and RV approver (is_supervisor) should always be in sync
    async update(id: string, input: UpdateRvInput): Promise<RV> {

        this.logger.log('update()')

        const existingItem = await this.prisma.rV.findUnique({
            where: { id },
            include: {
                rv_approvers: true
            }
        })

        if (!existingItem) {
            throw new NotFoundException('RV not found')
        }

        if (!this.canAccess(existingItem)) {
            throw new ForbiddenException('Only Admin and Owner can update this record!')
        }

        if (!(await this.canUpdate(input, existingItem))) {
            throw new Error('Failed to update RV. Please try again')
        }

        const data: Prisma.RVUpdateInput = {
            updated_by: this.authUser.user.username,
            supervisor_id: input.supervisor_id ?? existingItem.supervisor_id,
            classification_id: input.classification_id ?? existingItem.classification_id,
            work_order_no: input.work_order_no ?? existingItem.work_order_no,
            notes: input.notes ?? existingItem.notes,
            work_order_date: input.work_order_date ? new Date(input.work_order_date) : existingItem.work_order_date,
        }

        const queries = []

        const updateRvQuery = this.prisma.rV.update({
            data,
            where: { id },
            include: this.includedFields
        })

        queries.push(updateRvQuery)

        // if supervisor is updated
        if(input.supervisor_id) {

            const isNewSupervisor = input.supervisor_id !== existingItem.supervisor_id

            // update supervisor in rv approver as well
            if(isNewSupervisor) {

                const existingSupervisor = existingItem.rv_approvers.find(i => i.approver_id === existingItem.supervisor_id && !!i.is_supervisor)
    
                if(!existingSupervisor) {
                    throw new NotFoundException('Existing supervisor not found with id of ' + existingItem.supervisor_id)
                }

                console.log('Updating RV Approver supervisor');

                const updateRvApproverQuery = this.prisma.rVApprover.update({
                    where: {
                        id: existingSupervisor.id
                    },
                    data: {
                        approver_id: input.supervisor_id
                    }
                })

                queries.push(updateRvApproverQuery)

            }

        }

        const result = await this.prisma.$transaction(queries)

        this.logger.log('Successfully updated RV');

        return result[0]

        // const updated = await this.prisma.rV.update({
        //     data,
        //     where: { id },
        //     include: this.includedFields
        // })

        // this.logger.log('Successfully updated RV')

        // return updated

    }

    async cancel(id: string): Promise<WarehouseCancelResponse> {

        this.logger.log('cancel()')

        const existingItem = await this.prisma.rV.findUnique({
            where: { id },
            include: {
                canvass: true
            }
        })

        if (!existingItem) {
            throw new NotFoundException('RV not found')
        }

        if (!existingItem.canvass) {
            throw new Error('RV is not associated with a Canvass');
        }

        if (!this.canAccess(existingItem)) {
            throw new ForbiddenException('Only Admin and Owner can cancel this record!')
        }

        const updated = await this.prisma.rV.update({
            data: {
                cancelled_at: new Date(),
                cancelled_by: this.authUser.user.username,
                canvass: {
                    disconnect: true
                }
            },
            where: { id }
        })

        this.logger.log('Successfully cancelled RV')

        return {
            success: true,
            msg: 'Successfully cancelled RV',
            cancelled_at: updated.cancelled_at,
            cancelled_by: updated.cancelled_by
        }

    }

    async findOne(id: string): Promise<RV | null> {
        const item = await this.prisma.rV.findUnique({
            include: this.includedFields,
            where: { id }
        })

        if (!item) {
            throw new NotFoundException('RV not found')
        }

        return item
    }

    async findByRcNumber(rc_number: string): Promise<RV | null> {
        const item = await this.prisma.rV.findFirst({
            include: this.includedFields,
            where: {
                canvass: {
                    rc_number
                }
            }
        })

        if (!item) {
            throw new NotFoundException('RV not found')
        }

        return item
    }

    async findByRvNumber(rv_number: string): Promise<RV | null> {
        const item = await this.prisma.rV.findUnique({
            include: this.includedFields,
            where: { rv_number }
        })

        if (!item) {
            throw new NotFoundException('RV not found')
        }

        return item
    }

    async findAll(page: number, pageSize: number, date_requested?: string, requested_by_id?: string): Promise<RVsResponse> {
        console.log('rv: findAll');
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
            this.prisma.rV.findMany({
                include: this.includedFields,
                where: whereCondition,
                orderBy: {
                    rv_number: 'desc'
                },
                skip,
                take: pageSize,
            }),
            this.prisma.rV.count({
                where: whereCondition,
            })
        ])

        return {
            data: items,
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / pageSize),
        };
    }

    async findRvsByRvNumber(rvNumber: string, includeDetails: boolean = false) {

		const trimmedRvNumber = rvNumber.trim(); 

        let selectClause;
        if (includeDetails) {
            selectClause = { 
                id: true,
                rv_number: true, 
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
            selectClause = { rv_number: true };
        }

        const items = await this.prisma.rV.findMany({
            select: selectClause,
            where: {
                rv_number: {
                    startsWith: trimmedRvNumber
                },
                cancelled_at: null
            },
            orderBy: {
                rv_number: 'desc'
            },
            take: 10,
        });

        return items;
    }

    async getStatus(id: string): Promise<APPROVAL_STATUS> {

        const approvers = await this.prisma.rVApprover.findMany({
            where: {
                rv_id: id,
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

    async isReferenced(rvId: string): Promise<Boolean> {

        const meqs = await this.prisma.mEQS.findUnique({
            where: { rv_id: rvId }
        })

        if (meqs) return true

        return false

    }

    async updateClassificationByBudgetOfficer(rvId: string, payload: UpdateRvByBudgetOfficerInput): Promise<WarehouseRemoveResponse> {

        console.log('updateClassificationByBudgetOfficer()', rvId, payload)

        if (!this.authUser.user.user_employee) {
            throw new BadRequestException('this.authUser.user.user_employee is undefined')
        }

        if (!this.authUser.user.user_employee.employee.is_budget_officer) {
            throw new ForbiddenException('Only budget officer can update')
        }

        const { classification_id, notes, status } = payload

        const item = await this.prisma.rV.findUnique({
            where: { id: rvId }
        })

        if (!item) {
            throw new NotFoundException('RV not found with ID ' + rvId)
        }

        const isValidClassificationId = await this.isClassificationExist(classification_id, this.authUser)

        if (!isValidClassificationId) {
            throw new NotFoundException('Classification ID not valid')
        }

        const queries = []

        const updateRvClassificationIdQuery = this.prisma.rV.update({
            where: { id: rvId },
            data: {
                classification_id
            }
        })

        queries.push(updateRvClassificationIdQuery)

        const approver_id = this.authUser.user.user_employee.employee.id

        const rvApprover = await this.prisma.rVApprover.findFirst({
            where: {
                rv_id: rvId,
                approver_id
            }
        })

        if (!rvApprover) {
            throw new NotFoundException(`RV Approver not found with rv_id of ${rvId} and approver_id of ${approver_id} `)
        }

        const updateRvApproverQuery = this.prisma.rVApprover.update({
            where: { id: rvApprover.id },
            data: {
                notes,
                status,
                date_approval: new Date(),
                updated_by: this.authUser.user.username
            }
        })

        queries.push(updateRvApproverQuery)

        const result = await this.prisma.$transaction(queries)

        console.log('result', result)
        console.log('Successfully updated rv classification and rv approver')

        return {
            success: true,
            msg: 'Successfully updated rv classification and rv approver'
        }

    }

    async canUpdateForm(rvId: string): Promise<Boolean> {

        if (isAdmin(this.authUser)) {
            return true
        }

        const rv = await this.prisma.rV.findUnique({
            where: {
                id: rvId
            },
            select: {
                created_by: true,
                rv_approvers: true
            }
        })

        const isOwner = rv.created_by === this.authUser.user.username

        if (!isOwner) {
            return false
        }

        const hasApproval = rv.rv_approvers.find(i => i.status !== APPROVAL_STATUS.PENDING)

        if (hasApproval) {
            return false
        }

        return true

    }

    private async getLatestRvNumber(): Promise<string> {
        const currentYear = new Date().getFullYear().toString().slice(-2);

        const latestItem = await this.prisma.rV.findFirst({
            where: { rv_number: { startsWith: currentYear } },
            orderBy: { rv_number: 'desc' },
        });

        if (latestItem) {
            const latestNumericPart = parseInt(latestItem.rv_number.slice(-5), 10);
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

    private async canCreate(input: CreateRvInput): Promise<boolean> {

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

    private async canUpdate(input: UpdateRvInput, existingItem: RV): Promise<boolean> {

        // validates if there is already an approver who take an action
        if (isNormalUser(this.authUser)) {

            console.log('is normal user')

            const approvers = await this.prisma.rVApprover.findMany({
                where: {
                    rv_id: existingItem.id
                }
            })

            // used to indicate whether there is at least one approver whose status is not pending.
            const isAnyNonPendingApprover = this.isAnyNonPendingApprover(approvers)

            if (isAnyNonPendingApprover) {
                throw new BadRequestException(`Unable to update RV. Can only update if all approver's status is pending`)
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

    private canAccess(item: RV): boolean {

        if (isAdmin(this.authUser)) return true

        const isOwner = item.created_by === this.authUser.user.username

        if (isOwner) return true

        return false

    }

    // used to indicate whether there is at least one approver whose status is not pending.
    private isAnyNonPendingApprover(approvers: RVApprover[]): boolean {

        for (let approver of approvers) {

            if (approver.status !== APPROVAL_STATUS.PENDING) {

                return true

            }

        }

        return false

    }



}
