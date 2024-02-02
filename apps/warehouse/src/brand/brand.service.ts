import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBrandInput } from './dto/create-brand.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Brand, Prisma } from 'apps/warehouse/prisma/generated/client';
import { UpdateBrandInput } from './dto/update-brand.input';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Injectable()
export class BrandService {

  private readonly logger = new Logger(BrandService.name);

	constructor(private readonly prisma: PrismaService) {}

    async create(input: CreateBrandInput): Promise<Brand> {

        const data: Prisma.BrandCreateInput = {
            name: input.name
        }

        const created = await this.prisma.brand.create({
            data
        })

        this.logger.log('Successfully created Brand')

        return created 

    }

    async findAll(): Promise<Brand[]> {
		return await this.prisma.brand.findMany( {
			where: {
				is_deleted: false 
			}
		} )
	}

	async findOne(id: string): Promise<Brand | null> {

		const item = await this.prisma.brand.findUnique({
			where: { id }
		})

		console.log('item', item, id)

		if(!item){
            throw new NotFoundException('Brand not found')
        }

        return item
	}

    async update(id: string, input: UpdateBrandInput): Promise<Brand> {

		const existingItem = await this.findOne(id)

		const data: Prisma.BrandUpdateInput = {
			name: input.name ?? existingItem.name
		}

		
		const updated = await this.prisma.brand.update({ 
			data,
			where: {
				id
			}
		})
		
		this.logger.log('Successfully updated Brand')

		return updated

	}

    async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.brand.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "Brand successfully deleted"
		}

	}

}
