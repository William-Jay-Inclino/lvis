import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePoApproverSettingInput } from './dto/create-po-approver-setting.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { UpdatePoApproverSettingInput } from './dto/update-po-approver-setting.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { Prisma, POApproverSetting } from 'apps/system/prisma/generated/client';

@Injectable()
export class PoApproverSettingService {

	private readonly logger = new Logger(PoApproverSettingService.name);

	constructor(private readonly prisma: PrismaService) {}

	async create(input: CreatePoApproverSettingInput): Promise<POApproverSetting> {

		const data: Prisma.POApproverSettingCreateInput = {
			approver: { connect: { id: input.approver_id } },
			approver_proxy: input.approver_proxy_id ? { connect: { id: input.approver_id } } : undefined,
			label: input.label,
			order: input.order
		}

		const created = await this.prisma.pOApproverSetting.create({
			data,
			include: {
				approver: true
			}
		})

		this.logger.log('Successfully created pOApproverSetting')

		return created
	}

	async findAll(): Promise<POApproverSetting[]> {
		return await this.prisma.pOApproverSetting.findMany( {
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

	async findOne(id: string): Promise<POApproverSetting | null> {
		const item = await this.prisma.pOApproverSetting.findUnique({
            include: {
                approver: true
            },
			where: { id }
		})

		if(!item){
            throw new NotFoundException('pOApproverSetting not found')
        }

        return item
	}

	async update(id: string, input: UpdatePoApproverSettingInput): Promise<POApproverSetting> {

		const existingItem = await this.findOne(id)

		let approver_proxy = undefined

        if(input.approver_proxy_id){
            approver_proxy = {
                connect: { id: input.approver_proxy_id }
            }
        }else{
            approver_proxy = existingItem.approver_proxy_id ? { connect: { id: existingItem.approver_proxy_id } } : undefined
        }

		const data: Prisma.POApproverSettingUpdateInput = {
			approver: input.approver_id ? { connect: { id: input.approver_id } } : { connect: { id: existingItem.approver_id } },
			approver_proxy,
			label: input.label ?? existingItem.label,
			order: input.order ?? existingItem.order
		}

		const updated = await this.prisma.pOApproverSetting.update({ 
			data,
			where: {
				id
			},
			include: {
				approver: true
			}
		 })

		this.logger.log('Successfully updated pOApproverSetting')

		return updated
	}

	async remove(id: string): Promise<SystemRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.pOApproverSetting.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "pOApproverSetting successfully deleted"
		}

	}

}
