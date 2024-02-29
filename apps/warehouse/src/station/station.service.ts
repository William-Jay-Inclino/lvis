import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateStationInput } from './dto/create-station.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, Station } from 'apps/warehouse/prisma/generated/client';
import { UpdateStationInput } from './dto/update-station.input';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Injectable()
export class StationService {

  private readonly logger = new Logger(StationService.name);

	constructor(private readonly prisma: PrismaService) {}

    async create(input: CreateStationInput): Promise<Station> {

        const data: Prisma.StationCreateInput = {
            name: input.name,
            address: input.address,
        }

        const created = await this.prisma.station.create({
            data
        })

        this.logger.log('Successfully created Station')

        return created 

    }

    async findAll(): Promise<Station[]> {
		return await this.prisma.station.findMany( {
			where: {
				is_deleted: false 
			}
		} )
	}

	async findOne(id: string): Promise<Station | null> {

		const item = await this.prisma.station.findUnique({
			where: { id }
		})

		console.log('item', item, id)

		if(!item){
            throw new NotFoundException('Station not found')
        }

        return item
	}

    async update(id: string, input: UpdateStationInput): Promise<Station> {

		const existingItem = await this.findOne(id)

		const data: Prisma.StationUpdateInput = {
			name: input.name ?? existingItem.name,
			address: input.address ?? existingItem.address,
		}

		
		const updated = await this.prisma.station.update({ 
			data,
			where: {
				id
			}
		})
		
		this.logger.log('Successfully updated Station')

		return updated

	}

    async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.station.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "Station successfully deleted"
		}

	}

}
