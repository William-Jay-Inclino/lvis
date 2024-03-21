import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateRrItemInput } from './dto/update-rr-item.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, RRApprover, RRItem } from 'apps/warehouse/prisma/generated/client';
import { APPROVAL_STATUS, Role } from '../__common__/types';
import { AuthUser } from '../__common__/auth-user.entity';
import { UpdateRrItemsInput } from './dto/update-rr-items.input';
import { UpdateRrItemsResponse } from './entities/update-rr-items-response';

@Injectable()
export class RrItemService {

	private readonly logger = new Logger(RrItemService.name)
	private authUser: AuthUser
	private includedFields = {
		rr: true
	}

	constructor(
		private readonly prisma: PrismaService,
	) { }

	setAuthUser(authUser: AuthUser) {
		this.authUser = authUser
	}

	async findByRrId(rrId: string): Promise<RRItem[]> {

		return await this.prisma.rRItem.findMany({
			where: {
				rr_id: rrId
			},
			include: this.includedFields
		})

	}

	async findByRrNumber(rrNumber: string): Promise<RRItem[]> {

		return await this.prisma.rRItem.findMany({
			where: {
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

		if (!item) {
			throw new NotFoundException('RR Item not found')
		}

		return item
	}

	async update(id: string, input: UpdateRrItemInput): Promise<RRItem> {

		this.logger.log('update(')

		const existingItem = await this.findOne(id)

		if (!(await this.canUpdate(input, existingItem))) {
			throw new Error('Failed to update RR Item. Please try again')
		}

		const data: Prisma.RRItemUpdateInput = {
			quantity_accepted: input.quantity_accepted ?? existingItem.quantity_accepted,
			updated_by: this.authUser.user.username
		};


		const updated = await this.prisma.rRItem.update({
			data,
			where: { id },
			include: this.includedFields
		})

		this.logger.log('Successfully updated RR Item')

		return updated

	}

	async updateMultiple(inputs: UpdateRrItemsInput[]): Promise<UpdateRrItemsResponse> {

		this.logger.log('updateMultiple', inputs)

		const queries = []

		for (let input of inputs) {

			const updateRrItemQuery = this.prisma.rRItem.update({
				where: {
					id: input.id
				},
				data: {
					quantity_accepted: input.quantity_accepted,
					updated_by: this.authUser.user.username
				},
				include: {
					meqs_supplier_item: {
						include: {
							canvass_item: {
								include: {
									item: true,
									brand: true,
									unit: true
								}
							}
						}
					}
				}
			})

			queries.push(updateRrItemQuery)

		}

		const result = await this.prisma.$transaction(queries)

		console.log(`RR Items successfully updated it's quantity accepted`)

		return {
			success: true,
			msg: 'RR Items updated!',
			data: result
		}

	}

	private async canUpdate(input: UpdateRrItemInput, existingItem: RRItem): Promise<boolean> {

		const rr = await this.prisma.rR.findUnique({
			where: {
				id: existingItem.rr_id
			}
		})

		if (!rr) {
			throw new NotFoundException('RR not found with ID: ' + existingItem.rr_id)
		}

		const isNormalUser = this.isNormalUser()

		console.log('isNormalUser', isNormalUser)

		// validates if there is already an approver who take an action
		if (isNormalUser) {

			console.log('is normal user')

			const approvers = await this.prisma.rRApprover.findMany({
				where: {
					rr_id: existingItem.rr_id
				}
			})

			// used to indicate whether there is at least one approver whose status is not pending.
			const isAnyNonPendingApprover = this.isAnyNonPendingApprover(approvers)

			if (isAnyNonPendingApprover) {
				throw new BadRequestException(`Unable to update RR Item. Can only update if all rr approver's status is pending`)
			}
		}

		return true

	}
	// used to indicate whether there is at least one approver whose status is not pending.
	private isAnyNonPendingApprover(approvers: RRApprover[]): boolean {

		for (let approver of approvers) {

			if (approver.status !== APPROVAL_STATUS.PENDING) {

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
