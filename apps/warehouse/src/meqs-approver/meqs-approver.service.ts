import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMeqsApproverInput } from './dto/create-meqs-approver.input';
import { UpdateMeqsApproverInput } from './dto/update-meqs-approver.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, MEQSApprover } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS } from '../__common__/types';
import { AuthUser } from '../__common__/auth-user.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Injectable()
export class MeqsApproverService {

    private readonly logger = new Logger(MeqsApproverService.name);
    private authUser: AuthUser
    private includedFields = {
        meqs: {
            include: {
                rv: {
                    include: {
                        canvass: {
                            include: {
                                canvass_items: {
                                    include: {
                                        unit: true,
                                        brand: true
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
                                        unit: true,
                                        brand: true
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
                                        unit: true,
                                        brand: true
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
    ) {}

    setAuthUser(authUser: AuthUser){
        this.authUser = authUser
    }

    async create(input: CreateMeqsApproverInput): Promise<MEQSApprover> {

        const isValidApproverId = await this.isEmployeeExist(input.approver_id, this.authUser)

        if(!isValidApproverId){
            throw new NotFoundException('Approver ID not valid')
        }

        if(input.approver_proxy_id){
            const isValidApproverProxyId = await this.isEmployeeExist(input.approver_proxy_id, this.authUser)

            if(!isValidApproverProxyId){
                throw new NotFoundException('Approver Proxy ID not valid')
            }
        }

        const data: Prisma.MEQSApproverCreateInput = {
        meqs: { connect: { id: input.meqs_id } },
            approver_id: input.approver_id,
        approver_proxy_id: input.approver_proxy_id ?? null,
        label: input.label,
        order: input.order,
        status: APPROVAL_STATUS.PENDING
        }

        const created = await this.prisma.mEQSApprover.create({
            data,
            include: this.includedFields
        })

        this.logger.log('Successfully created mEQSApprover')

        return created
    }

    async findAll(): Promise<MEQSApprover[]> {
        return await this.prisma.mEQSApprover.findMany({
            include: this.includedFields,
            where: { is_deleted: false },
            orderBy: {
                label: 'asc'
            }
        })
    }

    async findOne(id: string): Promise<MEQSApprover | null> {
        
        const item = await this.prisma.mEQSApprover.findUnique({
            where: { id },
            include: this.includedFields
        })

        if(!item){
            throw new NotFoundException('MEQS Approver not found')
        }

        return item

    }

    async findByMeqsId(meqsId: string): Promise<MEQSApprover[]> {

        this.logger.log('findByMeqsId()', meqsId)

        return await this.prisma.mEQSApprover.findMany({
            include: this.includedFields,
            where: {
                is_deleted: false,
                meqs_id: meqsId
            },
            orderBy: {
                label: 'asc'
            }
        })
    }

    async findByMeqsNumber(meqsNumber: string): Promise<MEQSApprover[]> {
        return await this.prisma.mEQSApprover.findMany({
            include: this.includedFields,
            where: {
                is_deleted: false,
                meqs: {
                    meqs_number: meqsNumber
                }
            },
            orderBy: {
                label: 'asc'
            }
        })
    }

    async update(id: string, input: UpdateMeqsApproverInput): Promise<MEQSApprover> {
        this.logger.log('update()')

        const existingItem = await this.findOne(id)

        if(input.approver_id){

            const isValidApproverId = await this.isEmployeeExist(input.approver_id, this.authUser)

            if(!isValidApproverId){
                throw new NotFoundException('Approver ID not valid')
            }

        }

        if(input.approver_proxy_id){

            const isValidApproverProxyId = await this.isEmployeeExist(input.approver_proxy_id, this.authUser)

            if(!isValidApproverProxyId){
                throw new NotFoundException('Approver Proxy ID not valid')
            }

        }

        const data: Prisma.RVApproverUpdateInput = {
            approver_id: input.approver_id ?? existingItem.approver_id,
            approver_proxy_id: input.approver_proxy_id ?? existingItem.approver_proxy_id,
            date_approval: input.date_approval ? new Date(input.date_approval) : existingItem.date_approval,
            notes: input.notes ?? existingItem.notes,
            status: input.status ?? existingItem.status,
            label: input.label ?? existingItem.label,
            order: input.order ?? existingItem.order,
        }

        const updated = await this.prisma.mEQSApprover.update({
            data,
            where: { id },
            include: this.includedFields
        })

        this.logger.log('Successfully updated MEQS Approver')

        return updated

    }

    async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.mEQSApprover.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "MEQS Approver successfully deleted"
		}

	}

    private async isEmployeeExist(employee_id: string, authUser: AuthUser): Promise<boolean> {
    
        this.logger.log('isEmployeeExist', employee_id)

        // console.log('this.authUser', this.authUser)

        const query = `
            query{
                employee(id: "${employee_id}") {
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

        if(!data || !data.data || !data.data.employee){
            console.log('employee not found')
            return false 
        }
        const employee = data.data.employee 
        console.log('employee', employee)
        return true 

    }

    async forEmployee(employeeId: string): Promise<MEQSApprover[]> {
        return await this.prisma.mEQSApprover.findMany({
            where: {
                approver_id: employeeId,
                is_deleted: false
            }
        })
    }

}
