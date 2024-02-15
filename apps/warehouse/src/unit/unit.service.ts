import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUnitInput } from './dto/create-unit.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, Unit } from 'apps/warehouse/prisma/generated/client';
import { UpdateUnitInput } from './dto/update-unit.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { UnitsResponse } from './entities/units-response.entity';

@Injectable()
export class UnitService {

  private readonly logger = new Logger(UnitService.name);

	constructor(private readonly prisma: PrismaService) {}

    async create(input: CreateUnitInput): Promise<Unit> {

        const data: Prisma.UnitCreateInput = {
            name: input.name
        }

        const created = await this.prisma.unit.create({
            data
        })

        this.logger.log('Successfully created Unit')

        return created 

    }

    async findAll(page: number, pageSize: number, searchField?: string, searchValue?: string): Promise<UnitsResponse> {

		console.log('findAll')
		console.log('page', page)
		console.log('pageSize', pageSize)

		const skip = (page - 1) * pageSize;

		let whereCondition: any = {
			is_deleted: false,
		};
	  
		if (searchField && searchValue !== undefined) {
			whereCondition = {
				[searchField]: {
					contains: searchValue,
					mode: 'insensitive',
				},
			};
		}

		console.log('whereCondition', whereCondition)

		const items = await this.prisma.unit.findMany( {
			orderBy: {
				name: 'asc'
			},
			skip,
			take: pageSize,
			where: whereCondition
		} )

		const totalItems = await this.prisma.unit.count({
			where: whereCondition
		})

		return {
			data: items,
			totalItems,
			currentPage: page,
			totalPages: Math.ceil(totalItems / pageSize)
		}

	}

	async findOne(id: string): Promise<Unit | null> {

		const item = await this.prisma.unit.findUnique({
			where: { id }
		})

		console.log('item', item, id)

		if(!item){
            throw new NotFoundException('Unit not found')
        }

        return item
	}

    async update(id: string, input: UpdateUnitInput): Promise<Unit> {

		const existingItem = await this.findOne(id)

		const data: Prisma.UnitUpdateInput = {
			name: input.name ?? existingItem.name
		}

		
		const updated = await this.prisma.unit.update({ 
			data,
			where: {
				id
			}
		})
		
		this.logger.log('Successfully updated Unit')

		return updated

	}

    async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.unit.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "Unit successfully deleted"
		}

	}

}
