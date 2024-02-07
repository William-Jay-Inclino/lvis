import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRrApproverInput } from './dto/create-rr-approver.input';
import { UpdateRrApproverInput } from './dto/update-rr-approver.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, RRApprover } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS } from '../__common__/types';
import { AuthUser } from '../__common__/auth-user.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { getLastApprover, isValidApprovalStatus } from '../__common__/helpers';

@Injectable()
export class RrApproverService {

    private readonly logger = new Logger(RrApproverService.name);
    private authUser: AuthUser
    // private includedFields = {
    //   po: {
		// 	include: {
		// 		meqs_supplier: {
		// 			include: {
		// 				meqs: {
		// 					include: {
		// 					rv: {
		// 						include: {
		// 						canvass: true
		// 						}
		// 					},
		// 					jo: {
		// 						include: {
		// 						canvass: true
		// 						}
		// 					},
		// 					spr: {
		// 						include: {
		// 						canvass: true
		// 						}
		// 					}
		// 					}
		// 				},
		// 				supplier: true,
		// 				meqs_supplier_items: {
		// 					include: {
		// 					canvass_item: {
		// 						include: {
		// 						unit: true,
		// 						brand: true
		// 						}
		// 					}
		// 					}
		// 				},
		// 				attachments: true
		// 			}
		// 		}
		// 	}
    //   }
    // }

	constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
    ) {}

    setAuthUser(authUser: AuthUser){
        this.authUser = authUser
    }

    async create(input: CreateRrApproverInput): Promise<RRApprover> {

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

        const data: Prisma.POApproverCreateInput = {
        po: { connect: { id: input.po_id } },
            approver_id: input.approver_id,
        approver_proxy_id: input.approver_proxy_id ?? null,
        label: input.label,
        order: input.order,
        status: APPROVAL_STATUS.PENDING
        }

        const created = await this.prisma.pOApprover.create({
            data,
            include: this.includedFields
        })

        this.logger.log('Successfully created pOApprover')

        return created
    }

    async findAll(): Promise<POApprover[]> {
        return await this.prisma.pOApprover.findMany({
            include: this.includedFields,
            where: { is_deleted: false },
            orderBy: {
                label: 'asc'
            }
        })
    }

    async findOne(id: string): Promise<POApprover | null> {
        
        const item = await this.prisma.pOApprover.findUnique({
            where: { id },
            include: this.includedFields
        })

        if(!item){
            throw new NotFoundException('PO Approver not found')
        }

        return item

    }

    async findByPoId(poId: string): Promise<POApprover[]> {

        this.logger.log('findByPoId()', poId)

        return await this.prisma.pOApprover.findMany({
            include: this.includedFields,
            where: {
                is_deleted: false,
                po_id: poId
            },
            orderBy: {
                label: 'asc'
            }
        })
    }

    async findByPoNumber(poNumber: string): Promise<POApprover[]> {
        return await this.prisma.pOApprover.findMany({
            include: this.includedFields,
            where: {
                is_deleted: false,
                po: {
                    po_number: poNumber
                }
            },
            orderBy: {
                label: 'asc'
            }
        })
    }

    async update(id: string, input: UpdatePoApproverInput): Promise<POApprover> {
        this.logger.log('update()')

        const existingItem = await this.findOne(id)

        await this.validateInput(input)

        const data: Prisma.POApproverUpdateInput = {
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
            return await this.updatePOApprover(id, data)
        }

        if(input.status === APPROVAL_STATUS.APPROVED){
            return await this.handleApprovedStatus(id, data, existingItem.po_id)
        }

        if(input.status === APPROVAL_STATUS.DISAPPROVED){
            return await this.handleDisapprovedStatus(id, data, existingItem.po_id)
        }

        if(input.status === APPROVAL_STATUS.PENDING){
            return await this.handlePendingStatus(id, data, existingItem.po_id)
        }

    }

    async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.pOApprover.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "PO Approver successfully deleted"
		}

	}

    async forEmployee(employeeId: string): Promise<POApprover[]> {
        return await this.prisma.pOApprover.findMany({
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

    private async validateInput(input: UpdatePoApproverInput): Promise<void> {
        if (input.status && !isValidApprovalStatus(input.status)) {
            throw new BadRequestException('Invalid status value');
        }
    
        if (input.status && input.status === APPROVAL_STATUS.CANCELLED) {
            throw new BadRequestException('Cancelled status not allowed');
        }
    
        if (input.approver_id) {
            await this.validateEmployeeExistence(input.approver_id, 'Approver ID');
        }
    
        if (input.approver_proxy_id) {
            await this.validateEmployeeExistence(input.approver_proxy_id, 'Approver Proxy ID');
        }
    }

    private async validateEmployeeExistence(employeeId: string, errorMessage: string): Promise<void> {
        const isValidEmployeeId = await this.areEmployeesExist([employeeId], this.authUser);
        if (!isValidEmployeeId) {
            throw new NotFoundException(`${errorMessage} not valid`);
        }
    }

    private async updatePOApprover(id: string, data: Prisma.POApproverUpdateInput): Promise<POApprover> {
        const updated = await this.prisma.pOApprover.update({
            data,
            where: { id },
            include: this.includedFields,
        });
        this.logger.log('Successfully updated PO Approver');
        return updated;
    }

    // if last approver approves then update po status to approve
    private async handleApprovedStatus(id: string, data: Prisma.POApproverUpdateInput, poId: string): Promise<POApprover> {
        const approvers = await this.findByPoId(poId);
        const lastApprover = getLastApprover(approvers);
    
        if (lastApprover.id !== id) {
            return await this.updatePOApprover(id, data);
        }

        // if last approver approves

        const updatePoApprover = this.prisma.pOApprover.update({
            data,
            where: { id },
            include: this.includedFields,
        }); 
    
        const [updatedPoApprover, updatedPoStatus] = await this.prisma.$transaction([
            updatePoApprover,
            this.prisma.pO.update({
                data: { status: APPROVAL_STATUS.APPROVED },
                where: { id: poId },
            }),
        ]);
    
        this.logger.log('Successfully updated PO Approver');
        return updatedPoApprover;
    }

    // also update po status to disapproved
    private async handleDisapprovedStatus(id: string, data: Prisma.POApproverUpdateInput, poId: string): Promise<POApprover> {

        const updatePoApprover = this.prisma.pOApprover.update({
            data,
            where: { id },
            include: this.includedFields,
        }); 

        const [updatedPoApprover, updatedPoStatus] = await this.prisma.$transaction([
            updatePoApprover,
            this.prisma.pO.update({
                data: { status: APPROVAL_STATUS.DISAPPROVED },
                where: { id: poId },
            }),
        ]);
    
        this.logger.log('Successfully updated PO Approver');
        return updatedPoApprover;
    }

    // also update po status to pending
    private async handlePendingStatus(id: string, data: Prisma.POApproverUpdateInput, poId: string): Promise<POApprover> {

        const updatePoApprover = this.prisma.pOApprover.update({
            data,
            where: { id },
            include: this.includedFields,
        }); 

        const [updatedPoApprover, updatedPoStatus] = await this.prisma.$transaction([
            updatePoApprover,
            this.prisma.pO.update({
                data: { status: APPROVAL_STATUS.PENDING },
                where: { id: poId },
            }),
        ]);
    
        this.logger.log('Successfully updated PO Approver');
        return updatedPoApprover;
    }

}
