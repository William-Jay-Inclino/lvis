import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMeqsApproverInput } from './dto/create-meqs-approver.input';
import { UpdateMeqsApproverInput } from './dto/update-meqs-approver.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, MEQSApprover } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS } from '../__common__/types';
import { AuthUser } from '../__common__/auth-user.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { getLastApprover, isValidApprovalStatus } from '../__common__/helpers';

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

        const employeeIds = []

        employeeIds.push(input.approver_id)

        if(input.approver_proxy_id) {
            employeeIds.push(input.approver_proxy_id)
        }

        if(employeeIds.length > 0){
            const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)
    
            if(!isValidEmployeeIds){
                throw new BadRequestException("One or more employee id is invalid")
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
                order: 'asc'
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
                order: 'asc'
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
                order: 'asc'
            }
        })
    }

    async update(id: string, input: UpdateMeqsApproverInput): Promise<MEQSApprover> {
        this.logger.log('update()')

        const existingItem = await this.findOne(id)

        await this.validateInput(input)

        const data: Prisma.RVApproverUpdateInput = {
            approver_id: input.approver_id ?? existingItem.approver_id,
            approver_proxy_id: input.approver_proxy_id ?? existingItem.approver_proxy_id,
            date_approval: input.date_approval ? new Date(input.date_approval) : existingItem.date_approval,
            notes: input.notes ?? existingItem.notes,
            status: input.status ?? existingItem.status,
            label: input.label ?? existingItem.label,
            order: input.order ?? existingItem.order,
        }

        // if no status then normal update
        if(!input.status){
            return await this.updateMEQSApprover(id, data)
        }

        if(input.status === APPROVAL_STATUS.APPROVED){
            return await this.handleApprovedStatus(id, data, existingItem.meqs_id)
        }

        if(input.status === APPROVAL_STATUS.DISAPPROVED){
            return await this.handleDisapprovedStatus(id, data, existingItem.meqs_id)
        }

        if(input.status === APPROVAL_STATUS.PENDING){
            return await this.handlePendingStatus(id, data, existingItem.meqs_id)
        }

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

    async forEmployee(employeeId: string): Promise<MEQSApprover[]> {
        return await this.prisma.mEQSApprover.findMany({
            where: {
                approver_id: employeeId,
                is_deleted: false
            },
            include: this.includedFields
        })
    }


    private async validateInput(input: UpdateMeqsApproverInput): Promise<void> {
        if (input.status && !isValidApprovalStatus(input.status)) {
            throw new BadRequestException('Invalid status value');
        }
    
        if (input.status && input.status === APPROVAL_STATUS.CANCELLED) {
            throw new BadRequestException('Cancelled status not allowed');
        }
    
        const employeeIds = []

        if(input.approver_id){
            employeeIds.push(input.approver_id)
        }

        if(input.approver_proxy_id) {
            employeeIds.push(input.approver_proxy_id)
        }

        if(employeeIds.length > 0){
            const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)
    
            if(!isValidEmployeeIds){
                throw new BadRequestException("One or more employee id is invalid")
            }
        }
    }

    // private async validateEmployeeExistence(employeeId: string, errorMessage: string): Promise<void> {
    //     const isValidEmployeeId = await this.areEmployeesExist([employeeId], this.authUser);
    //     if (!isValidEmployeeId) {
    //         throw new NotFoundException(`${errorMessage} not valid`);
    //     }
    // }

    private async updateMEQSApprover(id: string, data: Prisma.MEQSApproverUpdateInput): Promise<MEQSApprover> {
        const updated = await this.prisma.mEQSApprover.update({
            data,
            where: { id },
            include: this.includedFields,
        });
        this.logger.log('Successfully updated MEQS Approver');
        return updated;
    }

    // if last approver approves then update meqs status to approve
    private async handleApprovedStatus(id: string, data: Prisma.MEQSApproverUpdateInput, meqsId: string): Promise<MEQSApprover> {
        const approvers = await this.findByMeqsId(meqsId);
        const lastApprover = getLastApprover(approvers);
    
        if (lastApprover.id !== id) {
            return await this.updateMEQSApprover(id, data);
        }

        // if last approver approves

        const updateMeqsApprover = this.prisma.mEQSApprover.update({
            data,
            where: { id },
            include: this.includedFields,
        }); 
    
        const [updatedMeqsApprover, updatedMeqsStatus] = await this.prisma.$transaction([
            updateMeqsApprover,
            this.prisma.mEQS.update({
                data: { status: APPROVAL_STATUS.APPROVED },
                where: { id: meqsId },
            }),
        ]);
    
        this.logger.log('Successfully updated MEQS Approver');
        return updatedMeqsApprover;
    }

    // also update meqs status to disapproved
    private async handleDisapprovedStatus(id: string, data: Prisma.MEQSApproverUpdateInput, meqsId: string): Promise<MEQSApprover> {

        const updateMeqsApprover = this.prisma.mEQSApprover.update({
            data,
            where: { id },
            include: this.includedFields,
        }); 

        const [updatedMeqsApprover, updatedMeqsStatus] = await this.prisma.$transaction([
            updateMeqsApprover,
            this.prisma.mEQS.update({
                data: { status: APPROVAL_STATUS.DISAPPROVED },
                where: { id: meqsId },
            }),
        ]);
    
        this.logger.log('Successfully updated MEQS Approver');
        return updatedMeqsApprover;
    }

    // also update meqs status to pending
    private async handlePendingStatus(id: string, data: Prisma.MEQSApproverUpdateInput, meqsId: string): Promise<MEQSApprover> {

        const updateMeqsApprover = this.prisma.mEQSApprover.update({
            data,
            where: { id },
            include: this.includedFields,
        }); 

        const [updatedMeqsApprover, updatedMeqsStatus] = await this.prisma.$transaction([
            updateMeqsApprover,
            this.prisma.mEQS.update({
                data: { status: APPROVAL_STATUS.PENDING },
                where: { id: meqsId },
            }),
        ]);
    
        this.logger.log('Successfully updated MEQS Approver');
        return updatedMeqsApprover;
    }

}
