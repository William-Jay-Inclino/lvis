import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RrItemService } from './rr-item.service';
import { RrItem } from './entities/rr-item.entity';
import { CreateRRItemInput } from './dto/create-rr-item.input';
import { UpdateRrItemInput } from './dto/update-rr-item.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
@UseGuards(GqlAuthGuard)
@Resolver(() => RrItem)
export class RrItemResolver {
  constructor(private readonly rrItemService: RrItemService) {}

  @Mutation(() => RrItem)
  createRrItem(
    @CurrentAuthUser() authUser: AuthUser,
    @Args('input') createRrItemInput: CreateRRItemInput
  ) {
    this.rrItemService.setAuthUser(authUser)
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
    @Args('input') updateRrItemInput: UpdateRrItemInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.rrItemService.setAuthUser(authUser)
    return this.rrItemService.update(id, updateRrItemInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  removeRrItem(@Args('id') id: string) {
    return this.rrItemService.remove(id);
  }
}
