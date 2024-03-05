import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { ItemsResponse } from './entities/items-response.entity';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Mutation(() => Item)
  createItem(@Args('input') createItemInput: CreateItemInput) {
    return this.itemService.create(createItemInput);
  }

  @Query(() => ItemsResponse)
  items(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('name', {nullable: true}) name?: string,
    @Args('itemTypeId', {nullable: true}) itemTypeId?: string,
  ) {
    return this.itemService.findAll(page, pageSize, name, itemTypeId);
  }

  @Query(() => Item)
  item(
    @Args('id', { nullable: true }) id?: string,
    @Args('code', { nullable: true }) code?: string,
  ) {
    if(id) {
      return this.itemService.findOne(id);
    }
    if(code) {
      return this.itemService.findByCode(code)
    }
  }

  @Mutation(() => Item)
  updateItem(
    @Args('id') id: string,
    @Args('input') updateItemInput: UpdateItemInput
  ) {
    return this.itemService.update(id, updateItemInput);
  }

  @Mutation(() => Item)
  removeItem(@Args('id') id: string) {
    return this.itemService.remove(id);
  }
}
