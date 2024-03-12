import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemTypeService } from './item-type.service';
import { ItemType } from './entities/item-type.entity';
import { CreateItemTypeInput } from './dto/create-item-type.input';
import { UpdateItemTypeInput } from './dto/update-item-type.input';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';

@Resolver(() => ItemType)
export class ItemTypeResolver {
  constructor(private readonly itemTypeService: ItemTypeService) { }

  @Mutation(() => ItemType)
  createItemType(
    @Args('input') createItemTypeInput: CreateItemTypeInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.itemTypeService.setAuthUser(authUser)
    return this.itemTypeService.create(createItemTypeInput);
  }

  @Query(() => [ItemType])
  item_types() {
    return this.itemTypeService.findAll();
  }

  @Query(() => ItemType)
  item_type(@Args('id') id: string) {
    return this.itemTypeService.findOne(id);
  }

  @Mutation(() => ItemType)
  updateItemType(
    @Args('id') id: string,
    @Args('input') updateItemTypeInput: UpdateItemTypeInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.itemTypeService.setAuthUser(authUser)
    return this.itemTypeService.update(id, updateItemTypeInput);
  }

  @Mutation(() => ItemType)
  removeItemType(@Args('id') id: string) {
    return this.itemTypeService.remove(id);
  }
}
