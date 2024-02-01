import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUnitInput } from './dto/create-unit.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, Unit } from 'apps/warehouse/prisma/generated/client';
import { UpdateUnitInput } from './dto/update-unit.input';
import { WarehouseRemoveResponse } from '../__common__/classes';

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

    async findAll(): Promise<Unit[]> {
		return await this.prisma.unit.findMany( {
			where: {
				is_deleted: false 
			}
		} )
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
