import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMeqsApproverSettingInput } from './dto/create-meqs-approver-setting.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { UpdateMeqsApproverSettingInput } from './dto/update-meqs-approver-setting.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { Prisma, MEQSApproverSetting } from 'apps/system/prisma/generated/client';

@Injectable()
export class MeqsApproverSettingService {

	private readonly logger = new Logger(MeqsApproverSettingService.name);

	constructor(private readonly prisma: PrismaService) {}

	async create(input: CreateMeqsApproverSettingInput): Promise<MEQSApproverSetting> {

		const data: Prisma.MEQSApproverSettingCreateInput = {
			approver: { connect: { id: input.approver_id } },
			approver_proxy: input.approver_proxy_id ? { connect: { id: input.approver_id } } : undefined,
			label: input.label,
			order: input.order
		}

		const created = await this.prisma.mEQSApproverSetting.create({
			data,
			include: {
				approver: true
			}
		})

		this.logger.log('Successfully created mEQSApproverSetting')

		return created
	}

	async findAll(): Promise<MEQSApproverSetting[]> {
		return await this.prisma.mEQSApproverSetting.findMany( {
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

	async findOne(id: string): Promise<MEQSApproverSetting | null> {
		const item = await this.prisma.mEQSApproverSetting.findUnique({
            include: {
                approver: true
            },
			where: { id }
		})

		if(!item){
            throw new NotFoundException('mEQSApproverSetting not found')
        }

        return item
	}

	async update(id: string, input: UpdateMeqsApproverSettingInput): Promise<MEQSApproverSetting> {

		const existingItem = await this.findOne(id)

		let approver_proxy = undefined

        if(input.approver_proxy_id){
            approver_proxy = {
                connect: { id: input.approver_proxy_id }
            }
        }else{
            approver_proxy = existingItem.approver_proxy_id ? { connect: { id: existingItem.approver_proxy_id } } : undefined
        }

		const data: Prisma.MEQSApproverSettingUpdateInput = {
			approver: input.approver_id ? { connect: { id: input.approver_id } } : { connect: { id: existingItem.approver_id } },
			approver_proxy,
			label: input.label ?? existingItem.label,
			order: input.order ?? existingItem.order
		}

		const updated = await this.prisma.mEQSApproverSetting.update({ 
			data,
			where: {
				id
			},
			include: {
				approver: true
			}
		 })

		this.logger.log('Successfully updated mEQSApproverSetting')

		return updated
	}

	async remove(id: string): Promise<SystemRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.mEQSApproverSetting.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "mEQSApproverSetting successfully deleted"
		}

	}

}
