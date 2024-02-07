import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRrApproverSettingInput } from './dto/create-rr-approver-setting.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { UpdateRrApproverSettingInput } from './dto/update-rr-approver-setting.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { Prisma, RRApproverSetting } from 'apps/system/prisma/generated/client';

@Injectable()
export class RrApproverSettingService {

	private readonly logger = new Logger(RrApproverSettingService.name);

	constructor(private readonly prisma: PrismaService) {}

	async create(input: CreateRrApproverSettingInput): Promise<RRApproverSetting> {

		const data: Prisma.RRApproverSettingCreateInput = {
			approver: { connect: { id: input.approver_id } },
			approver_proxy: input.approver_proxy_id ? { connect: { id: input.approver_id } } : undefined,
			label: input.label,
			order: input.order
		}

		const created = await this.prisma.rRApproverSetting.create({
			data,
			include: {
				approver: true
			}
		})

		this.logger.log('Successfully created rRApproverSetting')

		return created
	}

	async findAll(): Promise<RRApproverSetting[]> {
		return await this.prisma.rRApproverSetting.findMany( {
            include: {
                approver: true
            },
			where: {
				is_deleted: false 
			},
			orderBy: {
                order: 'asc'
            }
		} )
	}

	async findOne(id: string): Promise<RRApproverSetting | null> {
		const item = await this.prisma.rRApproverSetting.findUnique({
            include: {
                approver: true
            },
			where: { id }
		})

		if(!item){
            throw new NotFoundException('rRApproverSetting not found')
        }

        return item
	}

	async update(id: string, input: UpdateRrApproverSettingInput): Promise<RRApproverSetting> {

		const existingItem = await this.findOne(id)

		let approver_proxy = undefined

        if(input.approver_proxy_id){
            approver_proxy = {
                connect: { id: input.approver_proxy_id }
            }
        }else{
            approver_proxy = existingItem.approver_proxy_id ? { connect: { id: existingItem.approver_proxy_id } } : undefined
        }

		const data: Prisma.RRApproverSettingUpdateInput = {
			approver: input.approver_id ? { connect: { id: input.approver_id } } : { connect: { id: existingItem.approver_id } },
			approver_proxy,
			label: input.label ?? existingItem.label,
			order: input.order ?? existingItem.order
		}

		const updated = await this.prisma.rRApproverSetting.update({ 
			data,
			where: {
				id
			},
			include: {
				approver: true
			}
		 })

		this.logger.log('Successfully updated rRApproverSetting')

		return updated
	}

	async remove(id: string): Promise<SystemRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.rRApproverSetting.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "rRApproverSetting successfully deleted"
		}

	}

}
