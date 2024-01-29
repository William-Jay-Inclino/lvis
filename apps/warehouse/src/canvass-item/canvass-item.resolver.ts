import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { CanvassItemService } from './canvass-item.service';
import { CanvassItem } from './entities/canvass-item.entity';
import { CreateCanvassItemInput } from './dto/create-canvass-item.input';
import { UpdateCanvassItemInput } from './dto/update-canvass-item.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { WarehouseRemoveResponse } from '../__common__/classes';

@UseGuards(GqlAuthGuard)
@Resolver(() => CanvassItem)
export class CanvassItemResolver {
  constructor(private readonly canvassItemService: CanvassItemService) {}

  @Mutation(() => CanvassItem)
  createCanvassItem(@Args('input') createCanvassItemInput: CreateCanvassItemInput) {
    return this.canvassItemService.create(createCanvassItemInput);
  }

  @Query(() => [CanvassItem])
  canvass_items() {
    return this.canvassItemService.findAll();
  }

  @Query(() => CanvassItem)
  canvass_item(@Args('id') id: string) {
    return this.canvassItemService.findOne(id);
  }

  @Mutation(() => CanvassItem)
  updateCanvassItem(
    @Args('id') id: string,
    @Args('input') updateCanvassItemInput: UpdateCanvassItemInput
  ) {
    return this.canvassItemService.update(id, updateCanvassItemInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  removeCanvassItem(@Args('id', { type: () => String }) id: string) {
    return this.canvassItemService.remove(id);
  }
}
