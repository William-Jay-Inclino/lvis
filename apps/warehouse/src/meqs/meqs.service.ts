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

@Injectable()
export class MeqsService {
    private readonly logger = new Logger(MeqsService.name);
    private authUser: AuthUser

    private includedFields = {
        rv: {
            include: {
                canvass: true
            }
        },
        spr: {
            include: {
                canvass: true
            }
        },
        jo: {
            include: {
                canvass: true
            }
        },
        meqs_suppliers: {
            include: {
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
    ) {}

    setAuthUser(authUser: AuthUser){
        this.authUser = authUser
    }

    async create(input: CreateMeqsInput): Promise<MEQS> {

        this.logger.log('create()')

        if(!(await this.canCreate(input)) ) {
            throw new Error('Unable to create MEQS')
        }

        const meqsNumber = await this.getLatestMeqsNumber()

        const meqs_approvers: Prisma.MEQSApproverCreateNestedManyWithoutMeqsInput = {
            create: input.approvers.map(i => {
                return {
                    approver_id: i.approver_id,
                    approver_proxy_id: i.approver_proxy_id ?? undefined,
                    label: i.label,
                    order: i.order,
                    status: APPROVAL_STATUS.PENDING
                }
            })
        }

        const meqs_suppliers: Prisma.MEQSSupplierCreateNestedManyWithoutMeqsInput = {
            create: input.meqs_suppliers.map(supplier => {

                const supplierInput: Prisma.MEQSSupplierCreateWithoutMeqsInput = {
                    supplier: { connect: { id: supplier.supplier_id } },
                    payment_terms: supplier.payment_terms,
                    attachments: {
                        create: supplier.attachments.map(attachment => {
                            const attachmentInput: Prisma.MEQSSupplierAttachmentCreateWithoutMeqs_supplierInput = {
                                src: attachment.src
                            }
                            return attachmentInput
                        })
                    },
                    meqs_supplier_items: {
                        create: supplier.meqs_supplier_items.map(item => {

                            const itemInput: Prisma.MEQSSupplierItemCreateWithoutMeqs_supplierInput = {
                                price: item.price,
                                notes: item.notes,
                                is_awarded: item.is_awarded,
                                vat_type: item.vat_type,
                                canvass_item: { connect: { id: item.canvass_item_id } }
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
            request_type: input.request_type,
            meqs_date: new Date(input.meqs_date),
            meqs_approvers,
            meqs_suppliers
        }

        const model = this.getModel(input)
        return await this.createMeqsAndUpdateReference(model.name, model.id, data)

    }

    async createMeqsAndUpdateReference(model: string, refId: string, data: Prisma.MEQSCreateInput): Promise<MEQS> {

        // model can be jO, rV, or sPR
        // refId can be jo_id, rv_id, spr_id

        const createMeqsQuery = this.prisma.mEQS.create({
            data,
            include: this.includedFields
        })

        const referenceItem =  await this.prisma[model].findUnique({
            where: {
                id: refId
            }
        })

        if(!referenceItem) {
            throw new NotFoundException(`Reference not found either (rv, jo, spr) with id: ${refId} `)
        }
        
        const updateReferenceQuery = this.prisma[model].update({
            data: {
                is_referenced: true
            },
            where: {
                id: refId
            }
        })

        const [createdMeqs, updatedRef] = await this.prisma.$transaction([
            createMeqsQuery,
            updateReferenceQuery
        ])

        this.logger.log(`Successfully created MEQS and updated model: ${model} is_reference to true`)
        return createdMeqs
    }

    async update(id: string, input: UpdateMeqsInput): Promise<MEQS> {

        this.logger.log('update()')

        const existingItem = await this.findOne(id)

        if( !(await this.canUpdate(input, existingItem)) ) {
            throw new Error('Unable to update MEQS')
        }


        const data: Prisma.MEQSUpdateInput = {
            notes: input.notes ?? existingItem.notes,
            meqs_date: input.meqs_date ? new Date(input.meqs_date) : existingItem.meqs_date,
            canceller_id: input.canceller_id ?? existingItem.canceller_id,
            date_cancelled: input.canceller_id ? new Date() : existingItem.date_cancelled
        }

        const updated = await this.prisma.mEQS.update({
            where: { id },
            data,
            include: this.includedFields
        })

        this.logger.log('Successfully updated MEQS')

        return updated

    }

    async findAll(page: number, pageSize: number, date_requested?: string, requested_by_id?: string): Promise<MEQSsResponse> { 

        const skip = (page - 1) * pageSize;

        let whereCondition: any = {
            is_deleted: false,
        };

        if (date_requested) {
            const parsedDate = new Date(date_requested); 
            whereCondition.date_requested = {
                equals: parsedDate,
            };
        }

        if (requested_by_id) {
            whereCondition.requested_by_id = {
                equals: requested_by_id,
            };
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

        if(!item){
            throw new NotFoundException('MEQS not found')
        }

        return item

    }

    async findByMeqsNumber(meqs_number: string): Promise<MEQS | null> {

        const item = await this.prisma.mEQS.findUnique({
            where: { meqs_number },
            include: this.includedFields
        })

        if(!item){
            throw new NotFoundException('MEQS not found')
        }

        return item

    }

    async findMeqsNumbers(meqsNumber: string): Promise<{ meqs_number: string; }[]> {
	
		const arrayOfMeqsNumbers = await this.prisma.mEQS.findMany({
            select: {
                meqs_number: true
            },
            where: {
                meqs_number: {
                    contains: meqsNumber.trim().toLowerCase(),
                    mode: 'insensitive',
                },
                is_deleted: false
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

            if(data.data.validateEmployeeIds){
                return data.data.validateEmployeeIds;
            }
            
            return false
    
        } catch (error) {
            console.error('Error querying employees:', error.message);
            return false;
        }
    }

    async forEmployeeCanceller(employeeId: string): Promise<MEQS[]> {
        return await this.prisma.mEQS.findMany({
            where: {
                canceller_id: employeeId,
                is_deleted: false
            },
            include: this.includedFields
        })
    }

    private async canReference(input: CreateMeqsInput): Promise<{succes: boolean, msg: string}> {


        if(input.rv_id) {


            // find rv
            const rv = await this.prisma.rV.findUnique({
                where: { id: input.rv_id }
            })

            // check if rv is found
            if(!rv) {
                return { succes: false, msg: `RV not found with id: ${input.rv_id}` }
            }

            // validate if it's referenced
            if(rv.is_referenced) {
                return { succes: false, msg: `RV is already referenced` }
            }

            // get all approvers
            const approvers = await this.prisma.rVApprover.findMany({
                where: {
                    rv_id: input.rv_id,
                    is_deleted: false
                }
            })

            // validate if rv status is approved
            for(let approver of approvers) {

                if(approver.status !== APPROVAL_STATUS.APPROVED) {

                    return { succes: false, msg: 'Cannot reference RV. Status is not approved' }

                }

            }

        }

        return { succes: true, msg: '' }

    }

    private getModel(input: CreateMeqsInput): {name: string, id: string} {

        if(input.jo_id) {
            return { name: 'jO', id: input.jo_id }
        }

        if(input.rv_id) {
            return { name: 'rV', id: input.rv_id }
        }

        if(input.spr_id) {
            return { name: 'sPR', id: input.spr_id }
        }

    }

    private async canCreate(input: CreateMeqsInput): Promise<boolean> {

        if(!input.jo_id && !input.rv_id && !input.spr_id){
            throw new BadRequestException("Please provide 1 reference either jo, rv, or spr")
        }

        const employeeIds: string[] = input.approvers.map((input) =>
            [input.approver_id, input.approver_proxy_id].filter(Boolean).join(',')
        );

        this.logger.log('employeeIds', employeeIds)

        const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)

        if(!isValidEmployeeIds){
            throw new BadRequestException("One or more approver id or approver proxy id is invalid")
        }

        // validates if reference id is already referenced and if status is approved
        const canReference = await this.canReference(input)

        if(!canReference.succes) {
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
        if(isNormalUser) {

            console.log('is normal user')

            const approvers = await this.prisma.mEQSApprover.findMany({
                where: {
                    meqs_id: existingItem.id
                }
            })

            // used to indicate whether there is at least one approver whose status is not pending.
            const isAnyNonPendingApprover = this.isAnyNonPendingApprover(approvers)

            if(isAnyNonPendingApprover) {
                throw new BadRequestException(`Unable to update MEQS. Can only update if all approver's status is pending`)
            }
        }
        

        if(input.status){

            if(input.status !== APPROVAL_STATUS.CANCELLED){
                throw new BadRequestException("Unable to update status. Only accepts status = cancelled")
            }

        }

        if(input.canceller_id){
            const isValidEmployeeIds = await this.areEmployeesExist([input.canceller_id], this.authUser)
    
            if(!isValidEmployeeIds){
                throw new BadRequestException("Canceller ID is invalid")
            }
        }

        console.log('can update')
        return true

    }

    // used to indicate whether there is at least one approver whose status is not pending.
    private isAnyNonPendingApprover(approvers: MEQSApprover[]): boolean {

        for(let approver of approvers) {

            if(approver.status !== APPROVAL_STATUS.PENDING) {

                return true

            }

        }

        return false

    }

    private isNormalUser(): boolean {

        const isNormalUser = (this.authUser.user.role === Role.USER)

        return isNormalUser
    }

}
