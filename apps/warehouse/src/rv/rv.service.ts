import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CanvassService } from '../canvass/canvass.service';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, RV, RVApprover } from 'apps/warehouse/prisma/generated/client';
import { CreateRvInput } from './dto/create-rv.input';
import { APPROVAL_STATUS, Role } from '../__common__/types';
import { AuthUser } from '../__common__/auth-user.entity';
import { UpdateRvInput } from './dto/update-rv.input';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { isValidApprovalStatus } from '../__common__/helpers';
import { RVsResponse } from './entities/rvs-response.entity';

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

        if( !(await this.canCreate(input)) ) {
            throw new Error('Failed to create RV. Please try again')
        }

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

        if( !(await this.canUpdate(input, existingItem)) ) {
            throw new Error('Failed to update RV. Please try again')
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


        // if no supervisor input or same supervisor then normal update
        if(!input.supervisor_id || (input.supervisor_id === existingItem.supervisor_id)){

            const updated = await this.prisma.rV.update({
                data,
                where: { id },
                include: this.includedFields
            })
    
            this.logger.log('Successfully updated RV')
    
            return updated

        }

        // if supervisor is updated then delete the existing supervisor and create the new supervisor in rv approver table

        const updateRvQuery = this.prisma.rV.update({
            data,
            where: { id },
            include: this.includedFields
        })

        const existingRvApprover = await this.prisma.rVApprover.findFirst({
            where: {
                rv_id: id,
                approver_id: existingItem.supervisor_id
            }
        })

        if(!existingRvApprover){
            throw new NotFoundException('RV Approver not found')
        }

        const deleteRvApproverQuery = this.prisma.rVApprover.delete({
            where: {
                id: existingRvApprover.id
            }
        })

        const createRvApproverData: Prisma.RVApproverCreateInput = {
            rv: { connect: { id } },
            approver_id: input.supervisor_id,
            status: APPROVAL_STATUS.PENDING,
            label: existingRvApprover.label,
            order: existingRvApprover.order
        }

        const createRvApproverQuery = this.prisma.rVApprover.create({
            data: createRvApproverData
        })

        const result = await this.prisma.$transaction([
            updateRvQuery,
            deleteRvApproverQuery,
            createRvApproverQuery
        ])

        this.logger.log('Successfully updated RV, deleted rv approver associated with previous supervisor, added approver referencing new supervisor')

        return result[0]

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

    async findByRcNumber(rc_number: string): Promise<RV | null> {
		const item = await this.prisma.rV.findFirst({
            include: this.includedFields,
			where: {
                canvass: {
                    rc_number
                }
            }
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

    async findAll(page: number, pageSize: number, date_requested?: string, requested_by_id?: string): Promise<RVsResponse> {
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

        const items = await this.prisma.rV.findMany({
            include: this.includedFields, 
            where: whereCondition,
            orderBy: {
                rv_number: 'desc'
            },
            skip,
            take: pageSize,
        });

        const totalItems = await this.prisma.rV.count({
            where: whereCondition,
        });

        return {
            data: items,
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / pageSize),
        };
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

    async findRvNumbers(rvNumber: string): Promise<{ rv_number: string; }[]> {
	
		const arrayOfRvNumbers = await this.prisma.rV.findMany({
            select: {
                rv_number: true
            },
            where: {
                rv_number: {
                    contains: rvNumber.trim().toLowerCase(),
                    mode: 'insensitive',
                },
                is_deleted: false
            },
            take: 5,
		});
	
		return arrayOfRvNumbers;
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

    private async canCreate(input: CreateRvInput): Promise<boolean> {
        const employeeIds: string[] = input.approvers.map(({ approver_id, approver_proxy_id }) => {
            const ids = [approver_id, approver_proxy_id].filter(id => id !== null && id !== undefined);
            return ids.join(',');
        });

        this.logger.log('employeeIds', employeeIds)

        const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)

        if(!isValidEmployeeIds){
            throw new BadRequestException("One or more employee id is invalid")
        }

        const canvass = await this.prisma.canvass.findUnique({
            where: { id: input.canvass_id }
        })

        if(!canvass) {
            throw new NotFoundException('Canvass not found with id: ' + input.canvass_id)
        }

        if(canvass.is_referenced) {
            throw new BadRequestException('Canvass already been referenced with ID: ' + input.canvass_id)
        }

        return true

    }

    private async canUpdate(input: UpdateRvInput, existingItem: RV): Promise<boolean> {

        const isNormalUser = this.isNormalUser()

        console.log('isNormalUser', isNormalUser)

        // validates if there is already an approver who take an action
        if(isNormalUser) {

            console.log('is normal user')

            const approvers = await this.prisma.rVApprover.findMany({
                where: {
                    rv_id: existingItem.id
                }
            })

            // used to indicate whether there is at least one approver whose status is not pending.
            const isAnyNonPendingApprover = this.isAnyNonPendingApprover(approvers)

            if(isAnyNonPendingApprover) {
                throw new BadRequestException(`Unable to update RV. Can only update if all approver's status is pending`)
            }
        }


        if(input.status){
            if(input.status !== APPROVAL_STATUS.CANCELLED){
                throw new BadRequestException("Unable to update status. Only accepts status = cancelled")
            }

        }

        if(input.classification_id){
            const isValidClassificationId = await this.isClassificationExist(input.classification_id, this.authUser)

            if(!isValidClassificationId){
                throw new NotFoundException('Classification ID not valid')
            }
        }

        const employeeIds = []

        if(input.supervisor_id){
            employeeIds.push(input.supervisor_id)
        }

        if(input.canceller_id) {
            employeeIds.push(input.canceller_id)
        }

        if(employeeIds.length > 0){

            const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)

            if(!isValidEmployeeIds){
                throw new NotFoundException('One or more employee IDs is not valid')
            }

        }

        return true

    }

    // used to indicate whether there is at least one approver whose status is not pending.
    private isAnyNonPendingApprover(approvers: RVApprover[]): boolean {

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
