import { Resolver, Query, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { Position } from './entities/position.entity';
import { CreatePositionInput } from './dto/create-position.input';
import { UpdatePositionInput } from './dto/update-position.input';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { SystemRemoveResponse } from '../__common__/classes';
import { PositionService } from './position.service';

@UseGuards(GqlAuthGuard)
@Resolver(() => Position)
export class PositionResolver {
  constructor(private readonly positionService: PositionService) { }

  @Mutation(() => Position)
  createPosition(
    @Args('input') createPositionInput: CreatePositionInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.positionService.setAuthUser(authUser)
    return this.positionService.create(createPositionInput);
  }

  @Query(() => [Position])
  positions() {
    return this.positionService.findAll();
  }

  @Query(() => Position)
  position(@Args('id') id: string) {
    return this.positionService.findOne(id);
  }

  @Mutation(() => Position)
  updatePosition(
    @Args('id') id: string,
    @Args('input') updatePositionInput: UpdatePositionInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.positionService.setAuthUser(authUser)
    return this.positionService.update(id, updatePositionInput);
  }

  @Mutation(() => SystemRemoveResponse)
  removePosition(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.positionService.setAuthUser(authUser)
    return this.positionService.remove(id);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string, id: string }) {
    return await this.positionService.findOne(reference.id)
  }

}
