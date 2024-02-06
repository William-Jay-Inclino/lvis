import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateItemTypeInput } from './dto/create-item-type.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { ItemType, Prisma } from 'apps/warehouse/prisma/generated/client';
import { UpdateItemTypeInput } from './dto/update-item-type.input';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Injectable()
export class ItemTypeService {

  private readonly logger = new Logger(ItemTypeService.name);

	constructor(private readonly prisma: PrismaService) {}

    async create(input: CreateItemTypeInput): Promise<ItemType> {

        const data: Prisma.ItemTypeCreateInput = {
            name: input.name
        }

        const created = await this.prisma.itemType.create({
            data
        })

        this.logger.log('Successfully created Item Type')

        return created 

    }

    async findAll(): Promise<ItemType[]> {
		return await this.prisma.itemType.findMany( {
			where: {
				is_deleted: false 
			}
		} )
	}

	async findOne(id: string): Promise<ItemType | null> {

		const item = await this.prisma.itemType.findUnique({
			where: { id }
		})

		if(!item){
            throw new NotFoundException('Item Type not found')
        }

        return item
	}

    async update(id: string, input: UpdateItemTypeInput): Promise<ItemType> {

		const existingItem = await this.findOne(id)

		const data: Prisma.ItemTypeUpdateInput = {
			name: input.name ?? existingItem.name
		}

		
		const updated = await this.prisma.itemType.update({ 
			data,
			where: {
				id
			}
		})
		
		this.logger.log('Successfully updated Item Type')

		return updated

	}

    async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.itemType.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "Item Type successfully deleted"
		}

	}

}
