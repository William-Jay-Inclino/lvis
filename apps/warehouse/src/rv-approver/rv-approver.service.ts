import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRvApproverInput } from './dto/create-rv-approver.input';
import { UpdateRvApproverInput } from './dto/update-rv-approver.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, RVApprover } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS } from '../__common__/types';
import { AuthUser } from '../__common__/auth-user.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { getLastApprover, isValidApprovalStatus } from '../__common__/helpers';

@Injectable()
export class RvApproverService {

    private readonly logger = new Logger(RvApproverService.name);
    private authUser: AuthUser
    private includedFields = {
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
        }
    }

	constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) {}

    setAuthUser(authUser: AuthUser){
        this.authUser = authUser
    }

    async create(input: CreateRvApproverInput): Promise<RVApprover> {

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

        const data: Prisma.RVApproverCreateInput = {
        rv: { connect: { id: input.rv_id } },
            approver_id: input.approver_id,
        approver_proxy_id: input.approver_proxy_id ?? null,
        label: input.label,
        order: input.order,
        status: APPROVAL_STATUS.PENDING
        }

        const created = await this.prisma.rVApprover.create({
            data,
            include: this.includedFields
        })

        this.logger.log('Successfully created rVApprover')

        return created
    }

    async findAll(): Promise<RVApprover[]> {
        return await this.prisma.rVApprover.findMany({
            include: this.includedFields,
            where: { is_deleted: false }
        })
    }

    findOne(id: string): Promise<RVApprover | null> {
        
        const item = this.prisma.rVApprover.findUnique({
            where: { id },
            include: this.includedFields
        })

        if(!item){
            throw new NotFoundException('RV Approver not found')
        }

        return item

    }

    async findByRvId(rvId: string): Promise<RVApprover[]> {

        this.logger.log('findByRvId()', rvId)

        return await this.prisma.rVApprover.findMany({
            include: this.includedFields,
            where: {
                is_deleted: false,
                rv_id: rvId
            },
            orderBy: {
                order: 'asc'
            }
        })
    }

    async findByRvNumber(rvNumber: string): Promise<RVApprover[]> {
        return await this.prisma.rVApprover.findMany({
            include: this.includedFields,
            where: {
                is_deleted: false,
                rv: {
                    rv_number: rvNumber
                }
            },
            orderBy: {
                order: 'asc'
            }
        })
    }

    async update(id: string, input: UpdateRvApproverInput): Promise<RVApprover> {
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

        if(!input.status){
            return await this.updateRVApprover(id, data)
        }

        if(input.status === APPROVAL_STATUS.APPROVED){
            return await this.handleApprovedStatus(id, data, existingItem.rv_id)
        }

        if(input.status === APPROVAL_STATUS.DISAPPROVED){
            return await this.handleDisapprovedStatus(id, data, existingItem.rv_id)
        }

        if(input.status === APPROVAL_STATUS.PENDING){
            return await this.handlePendingStatus(id, data, existingItem.rv_id)
        }

    }

    async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.rVApprover.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "RV Approver successfully deleted"
		}

	}

    async forEmployee(employeeId: string): Promise<RVApprover[]> {
        return await this.prisma.rVApprover.findMany({
            where: {
                approver_id: employeeId,
                is_deleted: false
            },
            include: this.includedFields
        })
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

    private async validateInput(input: UpdateRvApproverInput): Promise<void> {
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

    private async updateRVApprover(id: string, data: Prisma.RVApproverUpdateInput): Promise<RVApprover> {
        const updated = await this.prisma.rVApprover.update({
            data,
            where: { id },
            include: this.includedFields,
        });
        this.logger.log('Successfully updated RV Approver');
        return updated;
    }

    // if last approver approves then update rv status to approve
    private async handleApprovedStatus(id: string, data: Prisma.RVApproverUpdateInput, rvId: string): Promise<RVApprover> {
        const approvers = await this.findByRvId(rvId);
        const lastApprover = getLastApprover(approvers);
    
        if (lastApprover.id !== id) {
            return await this.updateRVApprover(id, data);
        }

        // if last approver approves

        const updateRvApprover = this.prisma.rVApprover.update({
            data,
            where: { id },
            include: this.includedFields,
        }); 
    
        const [updatedRvApprover, updatedRvStatus] = await this.prisma.$transaction([
            updateRvApprover,
            this.prisma.rV.update({
                data: { status: APPROVAL_STATUS.APPROVED },
                where: { id: rvId },
            }),
        ]);
    
        this.logger.log('Successfully updated RV Approver');
        return updatedRvApprover;
    }

    // also update rv status to disapproved
    private async handleDisapprovedStatus(id: string, data: Prisma.RVApproverUpdateInput, rvId: string): Promise<RVApprover> {

        const updateRvApprover = this.prisma.rVApprover.update({
            data,
            where: { id },
            include: this.includedFields,
        }); 

        const [updatedRvApprover, updatedRvStatus] = await this.prisma.$transaction([
            updateRvApprover,
            this.prisma.rV.update({
                data: { status: APPROVAL_STATUS.DISAPPROVED },
                where: { id: rvId },
            }),
        ]);
    
        this.logger.log('Successfully updated RV Approver');
        return updatedRvApprover;
    }

    // also update rv status to pending
    private async handlePendingStatus(id: string, data: Prisma.RVApproverUpdateInput, rvId: string): Promise<RVApprover> {

        const updateRvApprover = this.prisma.rVApprover.update({
            data,
            where: { id },
            include: this.includedFields,
        }); 

        const [updatedRvApprover, updatedRvStatus] = await this.prisma.$transaction([
            updateRvApprover,
            this.prisma.rV.update({
                data: { status: APPROVAL_STATUS.PENDING },
                where: { id: rvId },
            }),
        ]);
    
        this.logger.log('Successfully updated RV Approver');
        return updatedRvApprover;
    }

}
