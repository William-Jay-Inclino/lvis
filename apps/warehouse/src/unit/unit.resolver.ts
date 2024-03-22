import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UnitService } from './unit.service';
import { Unit } from './entities/unit.entity';
import { CreateUnitInput } from './dto/create-unit.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UpdateUnitInput } from './dto/update-unit.input';
import { WarehouseRemoveResponse } from '../__common__/classes';

import { UnitsResponse } from './entities/units-response.entity'
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';

@UseGuards(GqlAuthGuard)
@Resolver(() => Unit)
export class UnitResolver {
  constructor(private readonly unitService: UnitService) { }

  @Mutation(() => Unit)
  createUnit(
    @Args('input') createUnitInput: CreateUnitInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.unitService.setAuthUser(authUser)
    return this.unitService.create(createUnitInput);
  }

  @Query(() => [Unit])
  units() {
    return this.unitService.findAll();
  }

  @Query(() => Unit)
  unit(@Args('id') id: string) {
    return this.unitService.findOne(id);
  }

  @Mutation(() => Unit)
  updateUnit(
    @Args('id') id: string,
    @Args('input') updateUnitInput: UpdateUnitInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.unitService.setAuthUser(authUser)
    return this.unitService.update(id, updateUnitInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  removeUnit(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.unitService.setAuthUser(authUser)
    return this.unitService.remove(id);
  }

}
