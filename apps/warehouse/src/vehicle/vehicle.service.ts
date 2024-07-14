import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, Vehicle } from 'apps/warehouse/prisma/generated/client';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';

@Injectable()
export class VehicleService {

	private readonly logger = new Logger(VehicleService.name);
	private authUser: AuthUser

	constructor(private readonly prisma: PrismaService) { }

	setAuthUser(authUser: AuthUser) {
		this.authUser = authUser
	}

	async create(input: CreateVehicleInput): Promise<Vehicle> {

		const data: Prisma.VehicleCreateInput = {
			name: input.name,
			plate_number: input.plate_number,
			created_by: this.authUser.user.username
		}

		const created = await this.prisma.vehicle.create({
			data
		})

		this.logger.log('Successfully created Vehicle')

		return created

	}

	async findAll(): Promise<Vehicle[]> {
		return await this.prisma.vehicle.findMany({
			where: {
				deleted_at: null
			}
		})
	}

	async findOne(id: string): Promise<Vehicle | null> {

		const item = await this.prisma.vehicle.findUnique({
			where: { id }
		})

		console.log('item', item, id)

		if (!item) {
			throw new NotFoundException('Vehicle not found')
		}

		return item
	}

	async update(id: string, input: UpdateVehicleInput): Promise<Vehicle> {

		const existingItem = await this.findOne(id)

		const data: Prisma.VehicleUpdateInput = {
			name: input.name ?? existingItem.name,
			plate_number: input.plate_number ?? existingItem.plate_number,
			updated_by: this.authUser.user.username
		}


		const updated = await this.prisma.vehicle.update({
			data,
			where: {
				id
			}
		})

		this.logger.log('Successfully updated Vehicle')

		return updated

	}

	async remove(id: string): Promise<WarehouseRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.vehicle.update({
			where: { id },
			data: {
				deleted_at: new Date(),
				deleted_by: this.authUser.user.username
			}
		})

		return {
			success: true,
			msg: "Vehicle successfully deleted"
		}

	}

}
