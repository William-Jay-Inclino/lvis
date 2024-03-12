import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private readonly vehicleService: VehicleService) { }

  @Mutation(() => Vehicle)
  createVehicle(
    @Args('input') createVehicleInput: CreateVehicleInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.vehicleService.setAuthUser(authUser)
    return this.vehicleService.create(createVehicleInput);
  }

  @Query(() => [Vehicle])
  vehicles() {
    return this.vehicleService.findAll();
  }

  @Query(() => Vehicle)
  vehicle(@Args('id') id: string) {
    return this.vehicleService.findOne(id);
  }

  @Mutation(() => Vehicle)
  updateVehicle(
    @Args('id') id: string,
    @Args('input') updateVehicleInput: UpdateVehicleInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.vehicleService.setAuthUser(authUser)
    return this.vehicleService.update(id, updateVehicleInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  removeVehicle(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.vehicleService.setAuthUser(authUser)
    return this.vehicleService.remove(id);
  }
}
