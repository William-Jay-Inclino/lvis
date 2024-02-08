import { Injectable, Logger } from '@nestjs/common';
import { CreateRRItemInput } from './dto/create-rr-item.input';
import { UpdateRrItemInput } from './dto/update-rr-item.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, RRItem } from 'apps/warehouse/prisma/generated/client';

@Injectable()
export class RrItemService {

	private readonly logger = new Logger(RrItemService.name)

    constructor(
        private readonly prisma: PrismaService,
    ) {}

	async create(input: CreateRRItemInput){
		
		// this.logger.log('create')

		// const data: Prisma.RRItemCreateInput = {
		// 	rr: { connect: { id: input.rr_id } },
		// 	item: input.item_id ? { connect: { id: input.item_id } } : undefined,
		// 	item_brand: input.item_brand_id ? { connect: { id: input.item_brand_id } } : undefined,
		// 	unit: input.unit_id ? { connect: { id: input.unit_id } } : undefined,
		// 	item_class: input.item_class,
		// 	quantity_delivered: input.quantity_delivered,
		// 	quantity_accepted: input.quantity_accepted,
		// 	description: input.description,
		// 	vat_type: input.vat_type,
		// 	gross_price: input.gross_price,
		// 	net_price: input.net_price,
		// 	freight_cost: input.freight_cost,
		// }

	}

	findAll() {
		return `This action returns all rrItem`;
	}

	findOne(id: number) {
		return `This action returns a #${id} rrItem`;
	}

	update(id: number, updateRrItemInput: UpdateRrItemInput) {
		return `This action updates a #${id} rrItem`;
	}

	remove(id: number) {
		return `This action removes a #${id} rrItem`;
	}
}
