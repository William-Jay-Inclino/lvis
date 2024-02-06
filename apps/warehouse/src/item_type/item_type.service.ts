import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateItemTypeInput } from './dto/create-item_type.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma } from 'apps/warehouse/prisma/generated/client';
import { UpdateItemTypeInput } from './dto/update-item_type.input';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Injectable()
export class ItemTypeService {

  private readonly logger = new Logger(ItemTypeService.name);

	// constructor(private readonly prisma: PrismaService) {}

  //   async create(input: CreateItemTypeInput): Promise<ItemType> {

  //       const data: Prisma.BrandCreateInput = {
  //           name: input.name
  //       }

  //       const created = await this.prisma.brand.create({
  //           data
  //       })

  //       this.logger.log('Successfully created Brand')

  //       return created 

  //   }

  //   async findAll(): Promise<Brand[]> {
	// 	return await this.prisma.brand.findMany( {
	// 		where: {
	// 			is_deleted: false 
	// 		}
	// 	} )
	// }

	// async findOne(id: string): Promise<Brand | null> {

	// 	const item = await this.prisma.brand.findUnique({
	// 		where: { id }
	// 	})

	// 	console.log('item', item, id)

	// 	if(!item){
  //           throw new NotFoundException('Brand not found')
  //       }

  //       return item
	// }

  //   async update(id: string, input: UpdateBrandInput): Promise<Brand> {

	// 	const existingItem = await this.findOne(id)

	// 	const data: Prisma.BrandUpdateInput = {
	// 		name: input.name ?? existingItem.name
	// 	}

		
	// 	const updated = await this.prisma.brand.update({ 
	// 		data,
	// 		where: {
	// 			id
	// 		}
	// 	})
		
	// 	this.logger.log('Successfully updated Brand')

	// 	return updated

	// }

  //   async remove(id: string): Promise<WarehouseRemoveResponse> {

	// 	const existingItem = await this.findOne(id)

	// 	await this.prisma.brand.update( {
	// 		where: { id },
	// 		data: { is_deleted: true }
	// 	} )

	// 	return {
	// 		success: true,
	// 		msg: "Brand successfully deleted"
	// 	}

	// }

}
