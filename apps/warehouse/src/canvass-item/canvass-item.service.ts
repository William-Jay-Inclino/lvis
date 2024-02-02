import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCanvassItemInput } from './dto/create-canvass-item.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { CanvassItem, Prisma } from 'apps/warehouse/prisma/generated/client';
import { UpdateCanvassItemInput } from './dto/update-canvass-item.input';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Injectable()
export class CanvassItemService {

	private readonly logger = new Logger(CanvassItemService.name);

	constructor(private readonly prisma: PrismaService) {}

	async create(input: CreateCanvassItemInput): Promise<CanvassItem> {

        this.logger.log('create()')

		if(!input.canvass_id){
			throw new BadRequestException("canvass id not found")
		}

		const data: Prisma.CanvassItemCreateInput = {
			description: input.description,
			canvass: {
                connect: { id: input.canvass_id }
            },
			brand: input.brand_id ? { connect: { id: input.brand_id } } : undefined,
            unit: {
                connect: { id: input.unit_id }
            },
			quantity: input.quantity
		}

		const created = await this.prisma.canvassItem.create({
			data,
			include: {
                unit: true,
                brand: true
            }
		})

		this.logger.log('Successfully created canvass')

		return created
	}

	async findAll(): Promise<CanvassItem[]> {
		return await this.prisma.canvassItem.findMany( {
            include: {
                unit: true,
                brand: true
            },
			where: {
				is_deleted: false 
			},
		} )
	}

	async findOne(id: string): Promise<CanvassItem | null> {
		const item = await this.prisma.canvassItem.findUnique({
            include: {
                unit: true,
                brand: true
            },
			where: { id }
		})

		if(!item){
            throw new NotFoundException('Item not found')
        }

        return item
	}

	async update(id: string, input: UpdateCanvassItemInput): Promise<CanvassItem> {

		const existingItem = await this.findOne(id)

        let brand = undefined 

        if(input.brand_id){
            brand = {
                connect: { id: input.brand_id }
            }
        }else{
            brand = existingItem.brand_id ? { connect: { id: existingItem.brand_id } } : undefined
        }

        const canvass = input.canvass_id ? { connect: { id: input.canvass_id } } : { connect: { id: existingItem.canvass_id } }
        const unit = input.unit_id ? { connect: { id: input.unit_id } } : { connect: { id: existingItem.unit_id } }

		const data: Prisma.CanvassItemUpdateInput = {
			description: input.description ?? existingItem.description,
			brand,
            unit,
			canvass,
			quantity: input.quantity
		}

		const updated = await this.prisma.canvassItem.update({ 
			data,
			where: {
				id
			},
			include: {
                unit: true,
                brand: true
            }
		 })

		this.logger.log('Successfully updated Canvass')

		return updated
	}

	async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.canvassItem.delete( {
			where: { id }
		} )

		return {
			success: true,
			msg: "Canvass Item successfully deleted"
		}

	}

}
