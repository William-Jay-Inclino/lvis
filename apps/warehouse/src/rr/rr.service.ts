import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRrInput } from './dto/create-rr.input';
import { UpdateRrInput } from './dto/update-rr.input';
import { AuthUser } from '../__common__/auth-user.entity';
import { PrismaService } from '../__prisma__/prisma.service';
import { HttpService } from '@nestjs/axios';
import { Prisma, RR } from 'apps/warehouse/prisma/generated/client';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { catchError, firstValueFrom } from 'rxjs';
import { APPROVAL_STATUS } from '../__common__/types';

@Injectable()
export class RrService {

    private readonly logger = new Logger(RrService.name)
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
                },
            }
        },
        rr_items: {
            include: {
                item: {
                    include: {
                        item_type: true,
                        unit: true,
                    }
                },
                item_brand: true,
                unit: true
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

    async create(input: CreateRrInput): Promise<RR> {

        this.logger.log('create()')

        const isValidEmployeeIds = await this.areEmployeesExist([input.received_by_id], this.authUser)

        if(!isValidEmployeeIds){
            throw new BadRequestException("One or more employee id is invalid")
        }

        const rrNumber = await this.getLatestRrNumber()

        const data: Prisma.RRCreateInput = {
            po: { connect: { id: input.po_id } },
            rr_number: rrNumber,
            rr_date: new Date(input.rr_date),
            received_by_id: input.received_by_id,
            invoice_number: input.invoice_number,
            delivery_number: input.delivery_number ?? undefined,
            notes: input.notes ?? undefined,
            delivery_charge: input.delivery_charge,
            rr_approvers: {
                create: input.approvers.map(i => {

                    const approver: Prisma.RRApproverCreateWithoutRrInput = {
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

        const created = await this.prisma.rR.create({
            data,
            include: this.includedFields
        })

        this.logger.log('Successfully created RR')

        return created

    }

    async findAll(): Promise<RR[]> {
        
        return await this.prisma.rR.findMany({
            include: this.includedFields,
            where: {
                is_deleted: false
            },
            orderBy: {
                rr_number: 'desc'
            }
        })

    }

    async findOne(id: string): Promise<RR | null> {
        const item = await this.prisma.rR.findUnique({
            include: this.includedFields,
            where: { id }
        })

        if(!item) {
            throw new NotFoundException('RR not found')
        }

        return item 
    }

    async findByRrNumber(rr_number: string): Promise<RR | null> {
        const item = await this.prisma.rR.findUnique({
            include: this.includedFields,
            where: { rr_number }
        })

        if(!item) {
            throw new NotFoundException('RR not found')
        }

        return item 
    }

    async update(id: string, input: UpdateRrInput): Promise<RR> {
        
        this.logger.log('update(')

        const existingItem = await this.findOne(id)

        const employeeIds = []

        if(input.received_by_id){
            employeeIds.push(input.received_by_id)
        }

        if(input.canceller_id) {
            employeeIds.push(input.canceller_id)
        }

        if(employeeIds.length > 0){
            const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)
    
            if(!isValidEmployeeIds){
                throw new BadRequestException("One or more employee id is invalid")
            }
        }

        const data: Prisma.RRUpdateInput = {
            rr_date: new Date(input.rr_date) ?? existingItem.rr_date,
            received_by_id: input.received_by_id ?? existingItem.received_by_id,
            canceller_id: input.canceller_id ?? existingItem.canceller_id,
            date_cancelled: input.canceller_id ? new Date() : existingItem.date_cancelled,
            invoice_number: input.invoice_number ?? existingItem.invoice_number,
            delivery_number: input.delivery_number ?? existingItem.delivery_number,
            notes: input.notes ?? existingItem.notes,
            delivery_charge: input.delivery_charge ?? existingItem.delivery_charge,
            status: input.status ?? existingItem.status,
        }

        const updated = await this.prisma.rR.update({
            data,
            where: { id },
            include: this.includedFields
        })

        this.logger.log('Successfully updated rr')

        return updated

    }

    async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.rR.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "RR successfully deleted"
		}

	}

    private async getLatestRrNumber(): Promise<string> {
        const currentYear = new Date().getFullYear().toString().slice(-2);
    
        const latestItem = await this.prisma.rR.findFirst({
          where: { rr_number: { startsWith: currentYear } },
          orderBy: { rr_number: 'desc' },
        });
    
        if (latestItem) {
          const latestNumericPart = parseInt(latestItem.rr_number.slice(-5), 10);
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
