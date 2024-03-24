import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { AccessGuard } from '../__auth__/guards/access.guard';
import { CheckAccess } from '../__auth__/check-access.decorator';
import { MODULES, RESOLVERS } from '../__common__/types';

@UseGuards(GqlAuthGuard)
@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private readonly vehicleService: VehicleService) { }

  @Mutation(() => Vehicle)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.VEHICLE, RESOLVERS.createVehicle)
  createVehicle(
    @Args('input') createVehicleInput: CreateVehicleInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.vehicleService.setAuthUser(authUser)
    return this.vehicleService.create(createVehicleInput);
  }

  @Query(() => [Vehicle])
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.VEHICLE, RESOLVERS.vehicles)
  vehicles() {
    return this.vehicleService.findAll();
  }

  @Query(() => Vehicle)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.VEHICLE, RESOLVERS.vehicle)
  vehicle(@Args('id') id: string) {
    return this.vehicleService.findOne(id);
  }

  @Mutation(() => Vehicle)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.VEHICLE, RESOLVERS.updateVehicle)
  updateVehicle(
    @Args('id') id: string,
    @Args('input') updateVehicleInput: UpdateVehicleInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.vehicleService.setAuthUser(authUser)
    return this.vehicleService.update(id, updateVehicleInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.VEHICLE, RESOLVERS.removeVehicle)
  removeVehicle(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.vehicleService.setAuthUser(authUser)
    return this.vehicleService.remove(id);
  }
}
