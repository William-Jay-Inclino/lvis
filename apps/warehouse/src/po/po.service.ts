import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../__prisma__/prisma.service';
import { CreatePoInput } from './dto/create-po.input';
import { PO, Prisma } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS } from '../__common__/types';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { UpdatePoInput } from './dto/update-po.input';
import { isValidApprovalStatus } from '../__common__/helpers';

@Injectable()
export class PoService {

    private readonly logger = new Logger(PoService.name)
    private authUser: AuthUser
    private includedFields = {
        meqs_supplier: {
            include: {
                meqs: {
                    include: {
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
                        }
                    }
                },
                supplier: true,
                attachments: true,
                meqs_supplier_items: {
                    include: {
                        canvass_item: {
                            include: {
                                unit: true,
                                brand: true
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

    async create(input: CreatePoInput): Promise<PO> {
        
        this.logger.log('create()')

        // ================================= VALIDATIONS =================================

        // 1. Validate approver ids, and approver proxy ids exist in employees table in system service.

        const employeeIds: string[] = input.approvers.map(({ approver_id, approver_proxy_id }) => {
            const ids = [approver_id, approver_proxy_id].filter(id => id !== null && id !== undefined);
            return ids.join(',');
        });

        this.logger.log('employeeIds', employeeIds)

        const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)

        if(!isValidEmployeeIds){
            throw new BadRequestException("One or more employee id is invalid")
        }

        // ================================= END VALIDATIONS =================================

        const poNumber = await this.getLatestPoNumber()

        const data: Prisma.POCreateInput = {
            po_number: poNumber,
            meqs_supplier: {
                connect: {
                    id: input.meqs_supplier_id
                }
            },
            po_date: new Date(input.po_date),
            po_approvers: {
                create: input.approvers.map(i => {

                    const approver: Prisma.POApproverCreateWithoutPoInput = {
                        approver_id: i.approver_id,
                        approver_proxy_id: i.approver_proxy_id ?? undefined,
                        label: i.label,
                        order: i.order,
                        status: APPROVAL_STATUS.PENDING
                    }

                    return approver

                })
            }
        }

        const createPoQuery = this.prisma.pO.create({
            data,
            include: this.includedFields
        })

        const updateMeqsSupplierQuery = this.prisma.mEQSSupplier.update({
            data: {
                is_referenced: true
            },
            where: {
                id: input.meqs_supplier_id
            }
        })

        const [createdPo, updatedMeqsSupplier] = await this.prisma.$transaction([
            createPoQuery,
            updateMeqsSupplierQuery
        ])

        this.logger.log(`Successfully created PO and updated field is_reference to true in meqs_supplier table`)

        return createdPo

    }

    async update(id: string, input: UpdatePoInput): Promise<PO> {

        this.logger.log('update(')

        const existingItem = await this.findOne(id)

        if(input.status){

            if(!isValidApprovalStatus(input.status)){
                throw new BadRequestException("Invalid status value")
            }

            if(input.status !== APPROVAL_STATUS.CANCELLED){
                throw new BadRequestException("Unable to update status. Only accepts status = cancelled")
            }

        }

        if(input.canceller_id){
            const isValidCancellerId = await this.areEmployeesExist([input.canceller_id], this.authUser)

            if(!isValidCancellerId){
                throw new NotFoundException('Canceller ID not valid')
            }
        }

        const data: Prisma.POUpdateInput = {
            po_date: input.po_date ? new Date(input.po_date) : existingItem.po_date,
            status: input.status ?? existingItem.status,
            canceller_id: input.canceller_id ?? existingItem.canceller_id,
            date_cancelled: input.canceller_id ? new Date() : existingItem.date_cancelled
        }

        const updated = await this.prisma.pO.update({
            data,
            where: { id },
            include: this.includedFields
        })

        this.logger.log('Successfully updated PO')

        return updated

    }

    async findAll(): Promise<PO[]> {
        return await this.prisma.pO.findMany({
            include: this.includedFields,
            where: {
                is_deleted: false
            },
            orderBy: {
                po_number: 'desc'
            }
        })
    }

    async findOne(id: string): Promise<PO | null> {
        const item = await this.prisma.pO.findUnique({
            include: this.includedFields,
            where: { id }
        })

        if(!item) {
            throw new NotFoundException('PO not found')
        }

        return item 
    }

    async findByPoNumber(po_number: string): Promise<PO | null> {
        const item = await this.prisma.pO.findUnique({
            include: this.includedFields,
            where: { po_number }
        })

        if(!item) {
            throw new NotFoundException('PO not found')
        }
        
        return item 
    }

    async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.pO.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "PO successfully deleted"
		}

	}


    private async getLatestPoNumber(): Promise<string> {
        const currentYear = new Date().getFullYear().toString().slice(-2);
    
        const latestItem = await this.prisma.pO.findFirst({
          where: { po_number: { startsWith: currentYear } },
          orderBy: { po_number: 'desc' },
        });
    
        if (latestItem) {
          const latestNumericPart = parseInt(latestItem.po_number.slice(-5), 10);
          const newNumericPart = latestNumericPart + 1;
          const newRcNumber = `${currentYear}-${newNumericPart.toString().padStart(5, '0')}`;
          return newRcNumber;
        } else {
          // If no existing rc_number with the current year prefix, start with '00001'
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

}
