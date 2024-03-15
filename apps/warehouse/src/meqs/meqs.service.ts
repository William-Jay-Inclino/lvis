import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { PrismaService } from '../__prisma__/prisma.service';
import { HttpService } from '@nestjs/axios';
import { CreateMeqsInput } from './dto/create-meqs.input';
import { JOApprover, MEQS, MEQSApprover, Prisma, RVApprover, SPRApprover } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS, Role } from '../__common__/types';
import { UpdateMeqsInput } from './dto/update-meqs.input';
import { catchError, firstValueFrom } from 'rxjs';
import { MEQSsResponse } from './entities/meqs-response.entity';
import * as moment from 'moment';
import { getDateRange } from '../__common__/helpers';
import { WarehouseCancelResponse } from '../__common__/classes';

@Injectable()
export class MeqsService {
    private readonly logger = new Logger(MeqsService.name);
    private authUser: AuthUser

    private includedFields = {
        rv: {
            include: {
                canvass: {
                    include: {
                        canvass_items: {
                            include: {
                                brand: true,
                                unit: true
                            }
                        }
                    }
                }
            }
        },
        spr: {
            include: {
                canvass: {
                    include: {
                        canvass_items: {
                            include: {
                                brand: true,
                                unit: true
                            }
                        }
                    }
                }
            }
        },
        jo: {
            include: {
                canvass: {
                    include: {
                        canvass_items: {
                            include: {
                                brand: true,
                                unit: true
                            }
                        }
                    }
                }
            }
        },
        meqs_suppliers: {
            include: {
                po: {
                    include: {
                        rrs: true
                    }
                },
                supplier: true,
                attachments: true,
                meqs_supplier_items: {
                    include: {
                        canvass_item: {
                            include: {
                                brand: true,
                                unit: true
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

    async create(input: CreateMeqsInput): Promise<MEQS> {

        this.logger.log('create()')

        if (!(await this.canCreate(input))) {
            throw new Error('Unable to create MEQS')
        }

        const meqsNumber = await this.getLatestMeqsNumber()
        const today = moment().format('MM/DD/YYYY')
        const createdBy = this.authUser.user.username

        const meqs_approvers: Prisma.MEQSApproverCreateNestedManyWithoutMeqsInput = {
            create: input.approvers.map(i => {
                return {
                    approver_id: i.approver_id,
                    label: i.label,
                    order: i.order,
                    status: APPROVAL_STATUS.PENDING,
                    created_by: createdBy,
                    notes: ''
                }
            })
        }

        const meqs_suppliers: Prisma.MEQSSupplierCreateNestedManyWithoutMeqsInput = {
            create: input.meqs_suppliers.map(supplier => {

                const supplierInput: Prisma.MEQSSupplierCreateWithoutMeqsInput = {
                    supplier: { connect: { id: supplier.supplier_id } },
                    payment_terms: supplier.payment_terms,
                    created_by: createdBy,
                    attachments: {
                        create: supplier.attachments.map(attachment => {
                            const attachmentInput: Prisma.MEQSSupplierAttachmentCreateWithoutMeqs_supplierInput = {
                                src: attachment.src,
                                created_by: createdBy
                            }
                            return attachmentInput
                        })
                    },
                    meqs_supplier_items: {
                        create: supplier.meqs_supplier_items.map(item => {

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

                return supplierInput
            })
        }

        const data: Prisma.MEQSCreateInput = {
            created_by: this.authUser.user.username,
            jo: input.jo_id ? { connect: { id: input.jo_id } } : undefined,
            rv: input.rv_id ? { connect: { id: input.rv_id } } : undefined,
            spr: input.spr_id ? { connect: { id: input.spr_id } } : undefined,
            notes: input.notes,
            meqs_number: meqsNumber,
            meqs_date: new Date(today),
            meqs_approvers,
            meqs_suppliers
        }



        const created = await this.prisma.mEQS.create({
            data,
            include: this.includedFields
        })

        this.logger.log('MEQS successfully created')

        return created


    }

    async update(id: string, input: UpdateMeqsInput): Promise<MEQS> {

        this.logger.log('update()')

        const existingItem = await this.prisma.mEQS.findUnique({
            where: { id }
        })

        if (!existingItem) {
            throw new NotFoundException('MEQS not found')
        }

        if (!(await this.canUpdate(input, existingItem))) {
            throw new Error('Unable to update MEQS')
        }


        const data: Prisma.MEQSUpdateInput = {
            notes: input.notes ?? existingItem.notes,
            updated_by: this.authUser.user.username
        }

        console.log('data', data)

        const updated = await this.prisma.mEQS.update({
            where: { id },
            data,
            include: this.includedFields
        })

        this.logger.log('Successfully updated MEQS')

        return updated

    }

    async cancel(id: string): Promise<WarehouseCancelResponse> {

        this.logger.log('cancel()')

        const existingItem = await this.prisma.mEQS.findUnique({
            where: { id }
        })

        if (!existingItem) {
            throw new NotFoundException('MEQS not found')
        }

        const updated = await this.prisma.mEQS.update({
            data: {
                cancelled_at: new Date(),
                cancelled_by: this.authUser.user.username
            },
            where: { id }
        })

        this.logger.log('Successfully cancelled MEQS')

        return {
            success: true,
            msg: 'Successfully cancelled MEQS',
            cancelled_at: updated.cancelled_at,
            cancelled_by: updated.cancelled_by
        }

    }

    async findAll(page: number, pageSize: number, date_requested?: string, requested_by_id?: string): Promise<MEQSsResponse> {

        const skip = (page - 1) * pageSize;

        let whereCondition: any = {};

        if (date_requested) {
            const { startDate, endDate } = getDateRange(date_requested);
            console.log('startDate', startDate);
            console.log('endDate', endDate)

            whereCondition.meqs_date = {
                gte: startDate,
                lte: endDate,
            };
        }

        if (requested_by_id) {
            whereCondition.OR = [
                { jo: { canvass: { requested_by_id: requested_by_id } } },
                { rv: { canvass: { requested_by_id: requested_by_id } } },
                { spr: { canvass: { requested_by_id: requested_by_id } } }
            ];
        }


        const items = await this.prisma.mEQS.findMany({
            include: this.includedFields,
            where: whereCondition,
            orderBy: {
                meqs_number: 'desc'
            },
            skip,
            take: pageSize,
        })

        const totalItems = await this.prisma.mEQS.count({
            where: whereCondition,
        });

        return {
            data: items,
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / pageSize),
        };

    }

    async findOne(id: string): Promise<MEQS | null> {

        const item = await this.prisma.mEQS.findUnique({
            where: { id },
            include: this.includedFields
        })

        if (!item) {
            throw new NotFoundException('MEQS not found')
        }

        return item

    }

    async findByMeqsNumber(meqs_number: string): Promise<MEQS | null> {

        const item = await this.prisma.mEQS.findUnique({
            where: { meqs_number },
            include: this.includedFields
        })

        if (!item) {
            throw new NotFoundException('MEQS not found')
        }

        return item

    }

    async findByReference(payload: {
        rv_number?: string,
        jo_number?: string,
        spr_number?: string
    }): Promise<MEQS | null> {

        const { rv_number, spr_number, jo_number } = payload
        let item = null

        if (rv_number) {
            item = await this.prisma.mEQS.findFirst({
                where: {
                    rv: { rv_number }
                },
                include: this.includedFields
            })

        } else if (jo_number) {
            item = await this.prisma.mEQS.findFirst({
                where: {
                    jo: { jo_number }
                },
                include: this.includedFields
            })
        } else {
            item = await this.prisma.mEQS.findFirst({
                where: {
                    spr: { spr_number }
                },
                include: this.includedFields
            })
        }


        if (!item) {
            throw new NotFoundException('MEQS not found')
        }

        return item
    }

    async getStatus(id: string): Promise<APPROVAL_STATUS> {

        const approvers = await this.prisma.mEQSApprover.findMany({
            where: {
                meqs_id: id,
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

    async searchByMeqsNumber(searchKeyword: string): Promise<{ meqs_number: string; }[]> {

        const arrayOfMeqsNumbers = await this.prisma.mEQS.findMany({
            select: {
                meqs_number: true
            },
            where: {
                meqs_number: {
                    contains: searchKeyword.trim().toLowerCase(),
                    mode: 'insensitive',
                }
            },
            take: 5,
        });

        return arrayOfMeqsNumbers;
    }

    private async getLatestMeqsNumber(): Promise<string> {
        const currentYear = new Date().getFullYear().toString().slice(-2);

        const latestItem = await this.prisma.mEQS.findFirst({
            where: { meqs_number: { startsWith: currentYear } },
            orderBy: { meqs_number: 'desc' },
        });

        if (latestItem) {
            const latestNumericPart = parseInt(latestItem.meqs_number.slice(-5), 10);
            const newNumericPart = latestNumericPart + 1;
            const newRcNumber = `${currentYear}-${newNumericPart.toString().padStart(5, '0')}`;
            return newRcNumber;
        } else {
            // If no existing meqs_number with the current year prefix, start with '00001'
            return `${currentYear}-00001`;
        }
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

            if (!data || !data.data) {
                console.log('No data returned');
                return false;
            }

            if (data.data.validateEmployeeIds) {
                return data.data.validateEmployeeIds;
            }

            return false

        } catch (error) {
            console.error('Error querying employees:', error.message);
            return false;
        }
    }

    async forEmployeeCanceller(username: string): Promise<MEQS[]> {
        return await this.prisma.mEQS.findMany({
            where: {
                cancelled_by: username
            },
            include: this.includedFields
        })
    }

    private async canReference(input: CreateMeqsInput): Promise<{ succes: boolean, msg: string }> {


        if (input.rv_id) {


            // find rv
            const rv = await this.prisma.rV.findUnique({
                where: { id: input.rv_id }
            })

            // check if rv is found
            if (!rv) {
                return { succes: false, msg: `RV not found with id: ${input.rv_id}` }
            }

            // validate if it's referenced

            const isRvReferenced = await this.prisma.mEQS.findUnique({
                where: { rv_id: rv.id }
            })

            if (isRvReferenced) {
                return { succes: false, msg: `RV is already referenced` }
            }

            // get all approvers
            const approvers = await this.prisma.rVApprover.findMany({
                where: {
                    rv_id: input.rv_id,
                    deleted_at: null
                }
            })

            // validate if rv status is approved
            for (let approver of approvers) {

                if (approver.status !== APPROVAL_STATUS.APPROVED) {

                    return { succes: false, msg: 'Cannot reference RV. Status is not approved' }

                }

            }

        }

        return { succes: true, msg: '' }

    }

    private async canCreate(input: CreateMeqsInput): Promise<boolean> {

        if (!input.jo_id && !input.rv_id && !input.spr_id) {
            throw new BadRequestException("Please provide 1 reference either jo, rv, or spr")
        }

        const employeeIds: string[] = input.approvers.map((input) =>
            input.approver_id
        );

        this.logger.log('employeeIds', employeeIds)

        const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)

        if (!isValidEmployeeIds) {
            throw new BadRequestException("One or more approver id or approver proxy id is invalid")
        }

        // validates if reference id is already referenced and if status is approved
        const canReference = await this.canReference(input)

        if (!canReference.succes) {
            throw new BadRequestException(canReference.msg)
        }

        return true

    }

    private async canUpdate(input: UpdateMeqsInput, existingItem: MEQS): Promise<boolean> {

        console.log('canUpdate()')
        console.log('authUser', this.authUser)


        const isNormalUser = this.isNormalUser()

        console.log('isNormalUser', isNormalUser)

        // validates if there is already an approver who take an action
        if (isNormalUser) {

            console.log('is normal user')

            const approvers = await this.prisma.mEQSApprover.findMany({
                where: {
                    meqs_id: existingItem.id
                }
            })

            // used to indicate whether there is at least one approver whose status is not pending.
            const isAnyNonPendingApprover = this.isAnyNonPendingApprover(approvers)

            if (isAnyNonPendingApprover) {
                throw new BadRequestException(`Unable to update MEQS. Can only update if all approver's status is pending`)
            }
        }

        console.log('can update')
        return true

    }

    // used to indicate whether there is at least one approver whose status is not pending.
    private isAnyNonPendingApprover(approvers: MEQSApprover[]): boolean {

        for (let approver of approvers) {

            if (approver.status !== APPROVAL_STATUS.PENDING) {

                return true

            }

        }

        return false

    }

    private isNormalUser(): boolean {

        const isNormalUser = (this.authUser.user.role === Role.USER)

        return isNormalUser
    }

    // private async isUserExist(user_id: string, authUser: AuthUser): Promise<boolean> {

    //     this.logger.log('isUserExist', user_id)

    //     const query = `
    //         query{
    //             user(id: "${user_id}") {
    //                 id
    //             }
    //         }
    //     `;

    //     const { data } = await firstValueFrom(
    //         this.httpService.post(process.env.API_GATEWAY_URL,
    //             { query },
    //             {
    //                 headers: {
    //                     Authorization: authUser.authorization,
    //                     'Content-Type': 'application/json'
    //                 }
    //             }
    //         ).pipe(
    //             catchError((error) => {
    //                 throw error
    //             }),
    //         ),
    //     );

    //     console.log('data', data)

    //     if (!data || !data.data || !data.data.user) {
    //         console.log('User not found')
    //         return false
    //     }
    //     return true

    // }

}
