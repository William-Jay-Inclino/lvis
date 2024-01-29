import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateClassificationInput } from './dto/create-classification.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Classification, Prisma } from 'apps/system/prisma/generated/client';
import { UpdateClassificationInput } from './dto/update-classification.input';
import { SystemRemoveResponse } from '../__common__/classes';

@Injectable()
export class ClassificationService {

	private readonly logger = new Logger(ClassificationService.name);

	constructor(private readonly prisma: PrismaService) {}

	async create(input: CreateClassificationInput): Promise<Classification> {

		const data: Prisma.ClassificationCreateInput = {
			name: input.name,
		}

		const created = await this.prisma.classification.create( { data } )

		this.logger.log('Successfully created Classification')

		return await this.findOne(created.id)
	}

	async findAll(): Promise<Classification[]> {
		return await this.prisma.classification.findMany( {
			where: {
				is_deleted: false 
			},
			orderBy: {
        name: 'asc'
      }
		} )
	}

	async findOne(id: string): Promise<Classification | null> {
		const item = await this.prisma.classification.findUnique({
			where: { id }
		})

		if(!item){
            throw new NotFoundException('Classification not found')
        }

        return item
	}

	async update(id: string, input: UpdateClassificationInput): Promise<Classification> {

		const existingItem = await this.findOne(id)

		const data: Prisma.ClassificationUpdateInput = {
			name: input.name ?? existingItem.name,
		}

		const updated = await this.prisma.classification.update({ 
			data,
			where: {
				id
			}
		 })

		this.logger.log('Successfully updated Classification')

		return await this.findOne(updated.id)
	}

	async remove(id: string): Promise<SystemRemoveResponse> {

		const existingItem = await this.findOne(id)

		await this.prisma.classification.update( {
			where: { id },
			data: { is_deleted: true }
		} )

		return {
			success: true,
			msg: "Classification successfully deleted"
		}

	}

}
