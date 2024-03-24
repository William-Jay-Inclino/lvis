import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemTypeService } from './item-type.service';
import { ItemType } from './entities/item-type.entity';
import { CreateItemTypeInput } from './dto/create-item-type.input';
import { UpdateItemTypeInput } from './dto/update-item-type.input';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { AccessGuard } from '../__auth__/guards/access.guard';
import { CheckAccess } from '../__auth__/check-access.decorator';
import { MODULES, RESOLVERS } from '../__common__/types';

@UseGuards(GqlAuthGuard)
@Resolver(() => ItemType)
export class ItemTypeResolver {
  constructor(private readonly itemTypeService: ItemTypeService) { }

  @Mutation(() => ItemType)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.ITEM_TYPE, RESOLVERS.createItemType)
  createItemType(
    @Args('input') createItemTypeInput: CreateItemTypeInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.itemTypeService.setAuthUser(authUser)
    return this.itemTypeService.create(createItemTypeInput);
  }

  @Query(() => [ItemType])
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.ITEM_TYPE, RESOLVERS.item_types)
  item_types() {
    return this.itemTypeService.findAll();
  }

  @Query(() => ItemType)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.ITEM_TYPE, RESOLVERS.item_type)
  item_type(@Args('id') id: string) {
    return this.itemTypeService.findOne(id);
  }

  @Mutation(() => ItemType)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.ITEM_TYPE, RESOLVERS.updateItemType)
  updateItemType(
    @Args('id') id: string,
    @Args('input') updateItemTypeInput: UpdateItemTypeInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.itemTypeService.setAuthUser(authUser)
    return this.itemTypeService.update(id, updateItemTypeInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.ITEM_TYPE, RESOLVERS.removeItemType)
  removeItemType(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.itemTypeService.setAuthUser(authUser)
    return this.itemTypeService.remove(id);
  }
}
