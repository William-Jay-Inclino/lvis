import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { PrismaService } from '../__prisma__/prisma.service';
import { HttpService } from '@nestjs/axios';
import { CreateMeqsInput } from './dto/create-meqs.input';
import { MEQS, Prisma } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS } from '../__common__/types';
import { UpdateMeqsInput } from './dto/update-meqs.input';
import { catchError, firstValueFrom } from 'rxjs';

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
        meqs_approvers: true,
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

        // ================================= VALIDATIONS =================================
        
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

        // ================================= END VALIDATIONS =================================

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

        const created = await this.prisma.mEQS.create({
            data,
            include: this.includedFields
        })

        this.logger.log('Successfully created MEQS')

        return created

    }

    async update(id: string, input: UpdateMeqsInput): Promise<MEQS> {

        this.logger.log('update()')

        const existingItem = await this.findOne(id)

        if(input.canceller_id){
            const isValidEmployeeIds = await this.areEmployeesExist([input.canceller_id], this.authUser)
    
            if(!isValidEmployeeIds){
                throw new BadRequestException("Canceller ID is invalid")
            }
        }


        const data: Prisma.MEQSUpdateInput = {
            notes: input.notes ?? existingItem.notes,
            meqs_date: input.meqs_date ? new Date(input.meqs_date) : existingItem.meqs_date,
            status: input.status ?? existingItem.status,
            canceller_id: input.canceller_id ?? existingItem.canceller_id
        }

        const updated = await this.prisma.mEQS.update({
            where: { id },
            data,
            include: this.includedFields
        })

        this.logger.log('Successfully updated MEQS')

        return updated

    }

    async findAll(): Promise<MEQS[]> { 
        return await this.prisma.mEQS.findMany({
            where: { is_deleted: false },
            orderBy: {
                meqs_number: 'desc'
            },
            include: this.includedFields
        })
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
    
    async forEmployee(employeeId: string): Promise<MEQS[]> {
        return await this.prisma.mEQS.findMany({
            where: {
                canceller_id: employeeId,
                is_deleted: false
            }
        })
    }

}
