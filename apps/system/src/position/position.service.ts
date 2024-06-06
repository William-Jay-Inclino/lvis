import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePositionInput } from './dto/create-position.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Position, Prisma } from 'apps/system/prisma/generated/client';
import { UpdatePositionInput } from './dto/update-position.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';

@Injectable()
export class PositionService {

	private readonly logger = new Logger(PositionService.name);
	private authUser: AuthUser

	constructor(private readonly prisma: PrismaService) { }

	setAuthUser(authUser: AuthUser) {
		this.authUser = authUser
	}

	async create(input: CreatePositionInput): Promise<Position> {

		const data: Prisma.PositionCreateInput = {
			name: input.name,
			created_by: this.authUser.user.username
		}

    if (input.permissions) {
      data.permissions = JSON.parse(input.permissions)
    }

		const created = await this.prisma.position.create({ data })

		this.logger.log('Successfully created Position')
		
		if(created.permissions) {
			created.permissions = JSON.stringify(created.permissions)
		}

		return created
	}

	async findAll(): Promise<Position[]> {
		const items = await this.prisma.position.findMany({
			where: {
				deleted_at: null
			},
			orderBy: {
				name: 'asc'
			}
		})

		return items.map(i => {
			i.permissions = !!i.permissions ? JSON.stringify(i.permissions) : null
			return i
		})
	}

	async findOne(id: string): Promise<Position | null> {
		const item = await this.prisma.position.findUnique({
			where: { id }
		})

		if (!item) {
			throw new NotFoundException('Position not found')
		}

		if(item.permissions) {
			item.permissions = JSON.stringify(item.permissions)
		}

		return item
	}

	async update(id: string, input: UpdatePositionInput): Promise<Position> {

		const existingItem = await this.findOne(id)

		const data: Prisma.PositionUpdateInput = {
			name: input.name ?? existingItem.name,
			updated_by: this.authUser.user.username
		}

    if (input.permissions) {
      data.permissions = JSON.parse(input.permissions)
    }

		const updated = await this.prisma.position.update({
			data,
			where: {
				id
			}
		})

		this.logger.log('Successfully updated Position')

		if(updated.permissions) {
			updated.permissions = JSON.stringify(updated.permissions)
		}

		return updated
	}

	async remove(id: string): Promise<SystemRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.position.update({
			where: { id },
			data: {
				deleted_at: new Date(),
				deleted_by: this.authUser.user.username
			}
		})

		return {
			success: true,
			msg: "Position successfully deleted"
		}

	}

}
