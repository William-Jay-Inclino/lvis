import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { ItemsResponse } from './entities/items-response.entity';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) { }

  @Mutation(() => Item)
  createItem(
    @Args('input') createItemInput: CreateItemInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.itemService.setAuthUser(authUser)
    return this.itemService.create(createItemInput);
  }

  @Query(() => ItemsResponse)
  items(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('item_type_id', { nullable: true }) item_type_id?: string,
  ) {
    return this.itemService.findAll(page, pageSize, name, item_type_id);
  }

  @Query(() => Item)
  item(
    @Args('id', { nullable: true }) id?: string,
    @Args('code', { nullable: true }) code?: string,
  ) {
    if (id) {
      return this.itemService.findOne(id);
    }
    if (code) {
      return this.itemService.findByCode(code)
    }
  }

  @Mutation(() => Item)
  updateItem(
    @Args('id') id: string,
    @Args('input') updateItemInput: UpdateItemInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.itemService.setAuthUser(authUser)
    return this.itemService.update(id, updateItemInput);
  }

  @Mutation(() => Item)
  removeItem(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.itemService.setAuthUser(authUser)
    return this.itemService.remove(id);
  }

  @ResolveField(() => Number)
  GWAPrice(@Parent() item: Item) {
    return this.itemService.getGWAPrice(item.item_transactions)
  }

}
