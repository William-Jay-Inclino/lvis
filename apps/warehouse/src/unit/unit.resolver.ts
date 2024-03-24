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
import { AccessGuard } from '../__auth__/guards/access.guard';
import { CheckAccess } from '../__auth__/check-access.decorator';
import { MODULES, RESOLVERS } from '../__common__/types';

@UseGuards(GqlAuthGuard)
@Resolver(() => Unit)
export class UnitResolver {
  constructor(private readonly unitService: UnitService) { }

  @Mutation(() => Unit)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.UNIT, RESOLVERS.createUnit)
  createUnit(
    @Args('input') createUnitInput: CreateUnitInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.unitService.setAuthUser(authUser)
    return this.unitService.create(createUnitInput);
  }

  @Query(() => [Unit])
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.UNIT, RESOLVERS.units)
  units() {
    return this.unitService.findAll();
  }

  @Query(() => Unit)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.UNIT, RESOLVERS.unit)
  unit(@Args('id') id: string) {
    return this.unitService.findOne(id);
  }

  @Mutation(() => Unit)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.UNIT, RESOLVERS.updateUnit)
  updateUnit(
    @Args('id') id: string,
    @Args('input') updateUnitInput: UpdateUnitInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.unitService.setAuthUser(authUser)
    return this.unitService.update(id, updateUnitInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.UNIT, RESOLVERS.removeUnit)
  removeUnit(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.unitService.setAuthUser(authUser)
    return this.unitService.remove(id);
  }

}
