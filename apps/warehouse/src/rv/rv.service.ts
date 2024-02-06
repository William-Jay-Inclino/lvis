import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
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
import { isValidApprovalStatus } from '../__common__/helpers';

@Injectable()
export class RvService {

    private readonly logger = new Logger(CanvassService.name);
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
    }

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) {}
    
    setAuthUser(authUser: AuthUser){
        this.authUser = authUser
    }
    
    async create(input: CreateRvInput): Promise<RV> {

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

        const rvNumber = await this.getLatestRvNumber()

        // data to be inserted in database
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
                        approver_proxy_id: i.approver_proxy_id ?? undefined,
                        label: i.label,
                        order: i.order,
                        status: APPROVAL_STATUS.PENDING
                    }
                })
            }
        }

        // execute db transaction 
        // 1. Create RV
        // 2. Update is_reference field in canvass table
        const [createdRv, updatedCanvass] = await this.prisma.$transaction([
            this.prisma.rV.create({ 
                data,
                include: this.includedFields
            }),
            this.prisma.canvass.update({
                data: {
                    is_referenced: true
                },
                where: {
                    id: input.canvass_id
                }
            })
        ])

        this.logger.log('Successfully created RV')
        this.logger.log(createdRv)
        this.logger.log(updatedCanvass)

		return createdRv

    }

    async update(id: string, input: UpdateRvInput): Promise<RV> {

        this.logger.log('update()')

        const existingItem = await this.findOne(id)

        if(input.status){

            if(!isValidApprovalStatus(input.status)){
                throw new BadRequestException("Invalid status value")
            }

            if(input.status !== APPROVAL_STATUS.CANCELLED){
                throw new BadRequestException("Unable to update status. Only accepts status = cancelled")
            }

        }

        if(input.supervisor_id){
            const isValidSupervisorId = await this.areEmployeesExist([input.supervisor_id], this.authUser)

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

        if(input.canceller_id) {
            const isValidCancellerId = await this.areEmployeesExist([input.canceller_id], this.authUser)

            if(!isValidCancellerId){
                throw new NotFoundException('Canceller ID not valid')
            }
        }

        const data: Prisma.RVUpdateInput = {
            supervisor_id: input.supervisor_id ?? existingItem.supervisor_id,
            classification_id: input.classification_id ?? existingItem.classification_id,
            date_requested: input.date_requested ? new Date(input.date_requested) : existingItem.date_requested,
            work_order_no: input.work_order_no ?? existingItem.work_order_no,
            work_order_date: input.work_order_date ? new Date(input.work_order_date) : existingItem.work_order_date,
            status: input.status ?? existingItem.status,
            canceller_id: input.canceller_id ?? existingItem.canceller_id,
            date_cancelled: input.canceller_id ? new Date() : existingItem.date_cancelled
        }

        const updated = await this.prisma.rV.update({
            data,
            where: { id },
            include: this.includedFields
        })

        this.logger.log('Successfully updated RV')

        return updated

    }

    async findOne(id: string): Promise<RV | null> {
		const item = await this.prisma.rV.findUnique({
            include: this.includedFields,
			where: { id }
		})

		if(!item){
            throw new NotFoundException('RV not found')
        }

        return item
	}

    async findByRvNumber(rv_number: string): Promise<RV | null> {
		const item = await this.prisma.rV.findUnique({
            include: this.includedFields,
			where: { rv_number }
		})

		if(!item){
            throw new NotFoundException('RV not found')
        }

        return item
	}

    async findAll(): Promise<RV[]> {
		return await this.prisma.rV.findMany( {
            include: this.includedFields,
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

    async forEmployeeSupervisor(employeeId: string): Promise<RV[]> {
        return await this.prisma.rV.findMany({
            where: {
                supervisor_id: employeeId,
                is_deleted: false
            },
            include: this.includedFields
        })
    }

    async forEmployeeCanceller(employeeId: string): Promise<RV[]> {
        return await this.prisma.rV.findMany({
            where: {
                canceller_id: employeeId,
                is_deleted: false
            },
            include: this.includedFields
        })
    }

    async forClassification(classificationId: string): Promise<RV[]> {
        return await this.prisma.rV.findMany({
            where: {
                classification_id: classificationId,
                is_deleted: false
            },
            include: this.includedFields
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
