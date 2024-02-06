import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemTypeService } from './item_type.service';
import { ItemType } from './entities/item_type.entity';
import { CreateItemTypeInput } from './dto/create-item_type.input';
import { UpdateItemTypeInput } from './dto/update-item_type.input';

@Resolver(() => ItemType)
export class ItemTypeResolver {
  constructor(private readonly itemTypeService: ItemTypeService) {}

  @Mutation(() => ItemType)
  createItemType(@Args('createItemTypeInput') createItemTypeInput: CreateItemTypeInput) {
    return this.itemTypeService.create(createItemTypeInput);
  }

  @Query(() => [ItemType], { name: 'itemType' })
  findAll() {
    return this.itemTypeService.findAll();
  }

  @Query(() => ItemType, { name: 'itemType' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemTypeService.findOne(id);
  }

  @Mutation(() => ItemType)
  updateItemType(@Args('updateItemTypeInput') updateItemTypeInput: UpdateItemTypeInput) {
    return this.itemTypeService.update(updateItemTypeInput.id, updateItemTypeInput);
  }

  @Mutation(() => ItemType)
  removeItemType(@Args('id', { type: () => Int }) id: number) {
    return this.itemTypeService.remove(id);
  }
}
