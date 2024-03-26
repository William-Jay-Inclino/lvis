import { Resolver, Query, Mutation, Args, Int, ResolveReference, ResolveField, Parent } from '@nestjs/graphql';
import { CanvassItemService } from './canvass-item.service';
import { CanvassItem } from './entities/canvass-item.entity';
import { CreateCanvassItemInput } from './dto/create-canvass-item.input';
import { UpdateCanvassItemInput } from './dto/update-canvass-item.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';

@UseGuards(GqlAuthGuard)
@Resolver(() => CanvassItem)
export class CanvassItemResolver {
  constructor(private readonly canvassItemService: CanvassItemService) { }

  @Mutation(() => CanvassItem)
  createCanvassItem(
    @Args('input') createCanvassItemInput: CreateCanvassItemInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.canvassItemService.setAuthUser(authUser)
    return this.canvassItemService.create(createCanvassItemInput);
  }

  @Query(() => CanvassItem)
  canvass_item(@Args('id') id: string) {
    return this.canvassItemService.findOne(id);
  }

  @Mutation(() => CanvassItem)
  updateCanvassItem(
    @Args('id') id: string,
    @Args('input') updateCanvassItemInput: UpdateCanvassItemInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.canvassItemService.setAuthUser(authUser)
    return this.canvassItemService.update(id, updateCanvassItemInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  removeCanvassItem(@Args('id', { type: () => String }) id: string) {
    return this.canvassItemService.remove(id);
  }

}
