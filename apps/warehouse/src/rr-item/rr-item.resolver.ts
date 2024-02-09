import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RrItemService } from './rr-item.service';
import { RrItem } from './entities/rr-item.entity';
import { CreateRRItemInput } from './dto/create-rr-item.input';
import { UpdateRrItemInput } from './dto/update-rr-item.input';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Resolver(() => RrItem)
export class RrItemResolver {
  constructor(private readonly rrItemService: RrItemService) {}

  @Mutation(() => RrItem)
  createRrItem(@Args('input') createRrItemInput: CreateRRItemInput) {
    return this.rrItemService.create(createRrItemInput);
  }

  @Query(() => [RrItem])
  async rr_items(
    @Args('rr_id', {nullable: true}) rr_id?: string,
  ) {
    if(rr_id){
      return await this.rrItemService.findByRrId(rr_id)
    }
    return this.rrItemService.findAll();
  }

  @Query(() => RrItem)
  async rr_item(
    @Args('id', {nullable: true}) id?: string,
    @Args('rr_number', {nullable: true}) rr_number?: string,
  ) {
    if(id){
      return await this.rrItemService.findOne(id);
    }
    if(rr_number){
      return await this.rrItemService.findByRrNumber(rr_number) 
    }
  }

  @Mutation(() => RrItem)
  updateRrItem(
    @Args('id') id: string,
    @Args('input') updateRrItemInput: UpdateRrItemInput
  ) {
    return this.rrItemService.update(id, updateRrItemInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  removeRrItem(@Args('id') id: string) {
    return this.rrItemService.remove(id);
  }
}
