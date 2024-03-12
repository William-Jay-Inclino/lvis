import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUnitInput } from './dto/create-unit.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, Unit } from 'apps/warehouse/prisma/generated/client';
import { UpdateUnitInput } from './dto/update-unit.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { UnitsResponse } from './entities/units-response.entity';
import { AuthUser } from '../__common__/auth-user.entity';

@Injectable()
export class UnitService {

	private readonly logger = new Logger(UnitService.name);
	private authUser: AuthUser

	constructor(private readonly prisma: PrismaService) { }

	setAuthUser(authUser: AuthUser) {
		this.authUser = authUser
	}

	async create(input: CreateUnitInput): Promise<Unit> {

		const data: Prisma.UnitCreateInput = {
			name: input.name,
			created_by: this.authUser.user.username
		}

		const created = await this.prisma.unit.create({
			data
		})

		this.logger.log('Successfully created Unit')

		return created

	}

	async findAll(page: number, pageSize: number, searchField?: string, searchValue?: string): Promise<UnitsResponse> {

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

		const items = await this.prisma.unit.findMany({
			orderBy: {
				name: 'asc'
			},
			skip,
			take: pageSize,
			where: whereCondition
		})

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

		if (!item) {
			throw new NotFoundException('Unit not found')
		}

		return item
	}

	async update(id: string, input: UpdateUnitInput): Promise<Unit> {

		const existingItem = await this.findOne(id)

		const data: Prisma.UnitUpdateInput = {
			name: input.name ?? existingItem.name,
			updated_by: this.authUser.user.username
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

		await this.prisma.unit.update({
			where: { id },
			data: {
				deleted_at: new Date(),
				deleted_by: this.authUser.user.username
			}
		})

		return {
			success: true,
			msg: "Unit successfully deleted"
		}

	}

}
