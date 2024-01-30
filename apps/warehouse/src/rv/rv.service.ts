import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CanvassService } from '../canvass/canvass.service';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, RV } from 'apps/warehouse/prisma/generated/client';
import { CreateRvInput } from './dto/create-rv.input';
import { APPROVAL_STATUS } from '../__common__/types';
import { AuthUser } from '../__common__/auth-user.entity';
import { UpdateRvInput } from './dto/update-rv.input';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Injectable()
export class RvService {

    private readonly logger = new Logger(CanvassService.name);
    private authUser: AuthUser

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) {}
    
    setAuthUser(authUser: AuthUser){
        this.authUser = authUser
    }
    
    async create(input: CreateRvInput): Promise<RV> {

        const isValidSupervisorId = await this.isEmployeeExist(input.supervisor_id, this.authUser)

        if(!isValidSupervisorId){
            throw new NotFoundException('Supervisor ID not valid')
        }

        const rvNumber = await this.getLatestRcNumber()

        const data: Prisma.RVCreateInput = {
            rv_number: rvNumber,
            date_requested: new Date(input.date_requested),
            work_order_no: input.work_order_no ?? null,
            work_order_date: input.work_order_date ? new Date(input.date_requested) : null,
            supervisor_id: input.supervisor_id,
            canvass: { connect: { id: input.canvass_id } },
            rv_approvers: {
                create: input.approvers.map(i => {
                    return {
                        approver_id: i.approver_id,
                        label: i.label,
                        order: i.order,
                        status: APPROVAL_STATUS.PENDING
                    }
                })
            }
        }

        const created = await this.prisma.rV.create( { data } )

        this.logger.log('Successfully created RV')

		return await this.findOne(created.id)

    }

    async update(id: string, input: UpdateRvInput): Promise<RV> {

        this.logger.log('update()')

        const existingItem = await this.findOne(id)

        if(input.supervisor_id){
            const isValidSupervisorId = await this.isEmployeeExist(input.supervisor_id, this.authUser)

            if(!isValidSupervisorId){
                throw new NotFoundException('Supervisor ID not valid')
            }
        }

        if(input.classification_id){
            const isValidClassificationId = await this.isClassificationExist(input.classification_id, this.authUser)

            if(!isValidClassificationId){
                throw new NotFoundException('Classification ID not valid')
            }
        }

        const data: Prisma.RVUpdateInput = {
            supervisor_id: input.supervisor_id ?? existingItem.supervisor_id,
            classification_id: input.classification_id ?? existingItem.classification_id,
            date_requested: input.date_requested ? new Date(input.date_requested) : existingItem.date_requested,
            work_order_no: input.work_order_no ?? existingItem.work_order_no,
            work_order_date: input.work_order_date ? new Date(input.work_order_date) : existingItem.work_order_date,
            status: input.status ?? existingItem.status
        }

        const updated = await this.prisma.rV.update({
            data,
            where: { id }
        })

        this.logger.log('Successfully updated RV')

        return await this.findOne(updated.id)

    }

    async findOne(id: string): Promise<RV | null> {
		const item = await this.prisma.rV.findUnique({
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
                },
                rv_approvers: {
                    orderBy: {
                        order: 'asc'
                    },
                    where: {
                        is_deleted: false
                    }
                }
            },
			where: { id }
		})

		if(!item){
            throw new NotFoundException('RV not found')
        }

        return item
	}

    async findAll(): Promise<RV[]> {
		return await this.prisma.rV.findMany( {
            include: {
                rv_approvers: {
                    orderBy: {
                        order: 'asc'
                    },
                    where: {
                        is_deleted: false
                    }
                },
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
            },
			where: {
				is_deleted: false 
			},
			orderBy: {
                rv_number: 'desc'
            }
		} )
	}

    async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.rV.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "RV successfully deleted"
		}

	}

    private async getLatestRcNumber(): Promise<string> {
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

    async forEmployeeSupervisor(employeeId: string): Promise<RV[]> {
        return await this.prisma.rV.findMany({
            where: {
                supervisor_id: employeeId,
                is_deleted: false
            }
        })
    }

    async forEmployeeCanceller(employeeId: string): Promise<RV[]> {
        return await this.prisma.rV.findMany({
            where: {
                canceller_id: employeeId,
                is_deleted: false
            }
        })
    }

    async forClassification(classificationId: string): Promise<RV[]> {
        return await this.prisma.rV.findMany({
            where: {
                classification_id: classificationId,
                is_deleted: false
            }
        })
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

        if(!data || !data.data || !data.data.classification){
            console.log('classification not found')
            return false 
        }
        const classification = data.data.classification 
        console.log('classification', classification)
        return true 

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

}
