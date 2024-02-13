import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRRItemInput } from './dto/create-rr-item.input';
import { UpdateRrItemInput } from './dto/update-rr-item.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, RRApprover, RRItem } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS, ITEM_TRANSACTION_TYPE, Role } from '../__common__/types';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';

@Injectable()
export class RrItemService {

	private readonly logger = new Logger(RrItemService.name)
	private authUser: AuthUser
	private includedFields = {
		rr: true
	}

    constructor(
        private readonly prisma: PrismaService,
    ) {}

	setAuthUser(authUser: AuthUser){
        this.authUser = authUser
    }
	
	async create(input: CreateRRItemInput): Promise<RRItem>{
		
		this.logger.log('create')

		if( !(await this.canCreate(input)) ) {
            throw new Error('Failed to create RR Item. Please try again')
        }

		const data: Prisma.RRItemCreateInput = {
			rr: { connect: { id: input.rr_id } },
			item: input.item_id ? { connect: { id: input.item_id } } : undefined,
			item_brand: input.item_brand_id ? { connect: { id: input.item_brand_id } } : undefined,
			unit: input.unit_id ? { connect: { id: input.unit_id } } : undefined,
			item_class: input.item_class,
			quantity_delivered: input.quantity_delivered,
			quantity_accepted: input.quantity_accepted,
			description: input.description,
			vat_type: input.vat_type,
			gross_price: input.gross_price,
			net_price: input.net_price,
			vat_amount: input.vat_amount,
		}

		const created = await this.prisma.rRItem.create({
            data,
            include: this.includedFields
        })

        this.logger.log('Successfully created RR Item')

        return created

	}

	async findAll(): Promise<RRItem[]> {

		return await this.prisma.rRItem.findMany({
			where: { is_deleted: false },
			include: this.includedFields
		})

	}

	async findByRrId(rrId: string): Promise<RRItem[]> {

		return await this.prisma.rRItem.findMany({
			where: {
				is_deleted: false,
				rr_id: rrId
			},
			include: this.includedFields
		})

	}

	async findByRrNumber(rrNumber: string): Promise<RRItem[]> {

		return await this.prisma.rRItem.findMany({
			where: {
				is_deleted: false,
				rr: {
					rr_number: rrNumber
				}
			},
			include: this.includedFields
		})

	}

	async findOne(id: string): Promise<RRItem | null> {
        const item = await this.prisma.rRItem.findUnique({
            include: this.includedFields,
            where: { id }
        })

        if(!item) {
            throw new NotFoundException('RR Item not found')
        }

        return item 
	}

	async update(id: string, input: UpdateRrItemInput): Promise<RRItem> {

        this.logger.log('update(')

        const existingItem = await this.findOne(id)

		if( !(await this.canUpdate(input, existingItem)) ) {
            throw new Error('Failed to update RR Item. Please try again')
        }

		const data: Prisma.RRItemUpdateInput = {
			item: { connect: { id: input.item_id || existingItem.item_id } },
			item_brand: { connect: { id: input.item_brand_id || existingItem.item_brand_id } },
			unit: { connect: { id: input.unit_id || existingItem.unit_id } },
			item_class: input.item_class ?? existingItem.item_class,
			quantity_delivered: input.quantity_delivered ?? existingItem.quantity_delivered,
			quantity_accepted: input.quantity_accepted ?? existingItem.quantity_accepted,
			description: input.description ?? existingItem.description,
			vat_type: input.vat_type ?? existingItem.vat_type,
			gross_price: input.gross_price ?? existingItem.gross_price,
			net_price: input.net_price ?? existingItem.net_price,
			vat_amount: input.vat_amount ?? existingItem.vat_amount
		};


		const updated = await this.prisma.rRItem.update({
			data,
			where: { id },
			include: this.includedFields
		})

		this.logger.log('Successfully updated RR Item')

		return updated

	}

	async remove(id: string): Promise<WarehouseRemoveResponse> {
		const existingItem = await this.findOne(id)

		await this.prisma.rRItem.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "RR Item successfully deleted"
		}
	}

	// 1.  Can only create rr item if associated rr status is pending
	// 2.  If there is already an approver who takes an action, you cannot create unless if your role is ADMIN OR IT 
	private async canCreate(input: CreateRRItemInput): Promise<boolean> {

		const rr = await this.prisma.rR.findUnique({
			where: {
				id: input.rr_id
			}
		})

		if(!rr) {
			throw new NotFoundException('RR not found with ID: ' + input.rr_id)
		}

		if(rr.status !== APPROVAL_STATUS.PENDING) {
			throw new BadRequestException('Can only create RR Item if rr status is PENDING')
		}

		const isNormalUser = this.isNormalUser()

        console.log('isNormalUser', isNormalUser)

        // validates if there is already an approver who take an action
        if(isNormalUser) {

            console.log('is normal user')

            const approvers = await this.prisma.rRApprover.findMany({
                where: {
                    rr_id: input.rr_id
                }
            })

            // used to indicate whether there is at least one approver whose status is not pending.
            const isAnyNonPendingApprover = this.isAnyNonPendingApprover(approvers)

            if(isAnyNonPendingApprover) {
                throw new BadRequestException(`Unable to create RR Item. Can only create if all rr approver's status is pending`)
            }
        }

		return true

	}

	private async canUpdate(input: UpdateRrItemInput, existingItem: RRItem): Promise<boolean> {

		const rr = await this.prisma.rR.findUnique({
			where: {
				id: input.rr_id
			}
		})

		if(!rr) {
			throw new NotFoundException('RR not found with ID: ' + input.rr_id)
		}

		if(rr.status !== APPROVAL_STATUS.PENDING) {
			throw new BadRequestException('Can only update RR Item if rr status is PENDING')
		}

		const isNormalUser = this.isNormalUser()

        console.log('isNormalUser', isNormalUser)

        // validates if there is already an approver who take an action
        if(isNormalUser) {

            console.log('is normal user')

            const approvers = await this.prisma.rRApprover.findMany({
                where: {
                    rr_id: input.rr_id
                }
            })

            // used to indicate whether there is at least one approver whose status is not pending.
            const isAnyNonPendingApprover = this.isAnyNonPendingApprover(approvers)

            if(isAnyNonPendingApprover) {
                throw new BadRequestException(`Unable to update RR Item. Can only update if all rr approver's status is pending`)
            }
        }

		return true

	}

	// used to indicate whether there is at least one approver whose status is not pending.
	private isAnyNonPendingApprover(approvers: RRApprover[]): boolean {

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
