import { Injectable } from '@nestjs/common';
import { CreateRRItemInput } from './dto/create-rr-item.input';
import { UpdateRrItemInput } from './dto/update-rr-item.input';

@Injectable()
export class RrItemService {
  create(createRrItemInput: CreateRRItemInput) {
    return 'This action adds a new rrItem';
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
