import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../__prisma__/prisma.service';
import { CreatePoInput } from './dto/create-po.input';
import { PO, POApprover, Prisma } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS, Role } from '../__common__/types';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { UpdatePoInput } from './dto/update-po.input';
import { POsResponse } from './entities/pos-response.entity';
import * as moment from 'moment';

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

        if( !(await this.canCreate(input)) ) {
            throw new Error('Failed to create PO. Please try again')
        }

        const poNumber = await this.getLatestPoNumber()
        const today = moment().format('MM/DD/YYYY')

        console.log('today', today)

        const data: Prisma.POCreateInput = {
            created_by: this.authUser.user.username,
            po_number: poNumber,
            meqs_supplier: {
                connect: {
                    id: input.meqs_supplier_id
                }
            },
            po_date: new Date(today),
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

        const created = await this.prisma.pO.create({
            data,
            include: this.includedFields
        })

        this.logger.log('Successfully created PO')

        return created

    }

    async update(id: string, input: UpdatePoInput): Promise<PO> {

        this.logger.log('update(')

        const existingItem = await this.findOne(id)

        if( !(await this.canUpdate(input, existingItem)) ) {
            throw new Error('Failed to update PO. Please try again')
        }

        const data: Prisma.POUpdateInput = {
            canceller_id: input.canceller_id ?? existingItem.canceller_id,
            date_cancelled: input.canceller_id ? new Date() : existingItem.date_cancelled,
            is_cancelled: input.canceller_id ? true : existingItem.is_cancelled
        }

        const updated = await this.prisma.pO.update({
            data,
            where: { id },
            include: this.includedFields
        })

        this.logger.log('Successfully updated PO')

        return updated

    }

    async findAll(page: number, pageSize: number, date_requested?: string, requested_by_id?: string): Promise<POsResponse> {

        const skip = (page - 1) * pageSize;

        let whereCondition: any = {
            is_deleted: false,
        };

        if (date_requested) {
            const parsedDate = new Date(date_requested); 
            whereCondition.po_date = {
                equals: parsedDate,
            };
        }

        if (requested_by_id) {
            whereCondition.OR = [
                { meqs_supplier: { meqs: { jo: { canvass: { requested_by_id: requested_by_id } } } } },
                { meqs_supplier: { meqs: { rv: { canvass: { requested_by_id: requested_by_id } } } } },
                { meqs_supplier: { meqs: { spr: { canvass: { requested_by_id: requested_by_id } } } } }
            ];
        }

        const items = await this.prisma.pO.findMany({
            include: this.includedFields,
            where: whereCondition,
            orderBy: {
                po_number: 'desc'
            },
            skip,
            take: pageSize,
        })

        const totalItems = await this.prisma.pO.count({
            where: whereCondition,
        });

        return {
            data: items,
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / pageSize),
        };

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

    async findByMeqsNumber(meqs_number: string): Promise<PO | null> {
        const item = await this.prisma.pO.findFirst({
            include: this.includedFields,
            where: {
                meqs_supplier: {
                    meqs: {
                        meqs_number
                    }
                }
            }
        })

        if(!item) {
            throw new NotFoundException('PO not found')
        }
        
        return item 
    }

    async findPoNumbers(poNumber: string): Promise<{ po_number: string; }[]> {
	
		const arrayOfPoNumbers = await this.prisma.pO.findMany({
            select: {
                po_number: true
            },
            where: {
                po_number: {
                    contains: poNumber.trim().toLowerCase(),
                    mode: 'insensitive',
                },
                is_deleted: false
            },
            take: 5,
		});
	
		return arrayOfPoNumbers;
	}

    async getStatus(po_id: string): Promise<APPROVAL_STATUS> {

        const approvers = await this.prisma.pOApprover.findMany({
            where: {
                po_id,
                is_deleted: false
            }
        })

        const hasDisapproved = approvers.find(i => i.status === APPROVAL_STATUS.DISAPPROVED)

        if(hasDisapproved) {
            return APPROVAL_STATUS.DISAPPROVED
        }

        const hasPending = approvers.find(i => i.status === APPROVAL_STATUS.PENDING)

        if(hasPending) {
            return APPROVAL_STATUS.PENDING
        }

        return APPROVAL_STATUS.APPROVED

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

    private async canCreate(input: CreatePoInput): Promise<boolean> {

        // VALIDATE EMPLOYEE IDS

        const employeeIds: string[] = input.approvers.map(({ approver_id, approver_proxy_id }) => {
            const ids = [approver_id, approver_proxy_id].filter(id => id !== null && id !== undefined);
            return ids.join(',');
        });

        this.logger.log('employeeIds', employeeIds)

        const isValidEmployeeIds = await this.areEmployeesExist(employeeIds, this.authUser)

        if(!isValidEmployeeIds){
            throw new BadRequestException("One or more employee id is invalid")
        }

        return true

    }

    private async canUpdate(input: UpdatePoInput, existingItem: PO): Promise<boolean> {

        const isNormalUser = this.isNormalUser()

        console.log('isNormalUser', isNormalUser)

        // validates if there is already an approver who take an action
        if(isNormalUser) {

            console.log('is normal user')

            const approvers = await this.prisma.pOApprover.findMany({
                where: {
                    po_id: existingItem.id
                }
            })

            // used to indicate whether there is at least one approver whose status is not pending.
            const isAnyNonPendingApprover = this.isAnyNonPendingApprover(approvers)

            if(isAnyNonPendingApprover) {
                throw new BadRequestException(`Unable to update PO. Can only update if all approver's status is pending`)
            }
        }

        if(input.canceller_id){
            const isValidCancellerId = await this.areEmployeesExist([input.canceller_id], this.authUser)

            if(!isValidCancellerId){
                throw new NotFoundException('Canceller ID not valid')
            }
        }

        return true 
    }

    // used to indicate whether there is at least one approver whose status is not pending.
    private isAnyNonPendingApprover(approvers: POApprover[]): boolean {

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
