import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RrItemService } from './rr-item.service';
import { RrItem } from './entities/rr-item.entity';
import { CreateRRItemInput } from './dto/create-rr-item.input';
import { UpdateRrItemInput } from './dto/update-rr-item.input';

@Resolver(() => RrItem)
export class RrItemResolver {
  constructor(private readonly rrItemService: RrItemService) {}

  @Mutation(() => RrItem)
  createRrItem(@Args('createRrItemInput') createRrItemInput: CreateRRItemInput) {
    return this.rrItemService.create(createRrItemInput);
  }

  @Query(() => [RrItem], { name: 'rrItem' })
  findAll() {
    return this.rrItemService.findAll();
  }

  @Query(() => RrItem, { name: 'rrItem' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rrItemService.findOne(id);
  }

  // @Mutation(() => RrItem)
  // updateRrItem(@Args('updateRrItemInput') updateRrItemInput: UpdateRrItemInput) {
  //   return this.rrItemService.update(updateRrItemInput.id, updateRrItemInput);
  // }

  @Mutation(() => RrItem)
  removeRrItem(@Args('id', { type: () => Int }) id: number) {
    return this.rrItemService.remove(id);
  }
}
