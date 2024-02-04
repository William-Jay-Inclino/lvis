import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  @Mutation(() => Vehicle)
  createVehicle(@Args('input') createVehicleInput: CreateVehicleInput) {
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
    @Args('input') updateVehicleInput: UpdateVehicleInput
  ) {
    return this.vehicleService.update(id, updateVehicleInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  removeVehicle(@Args('id') id: string) {
    return this.vehicleService.remove(id);
  }
}
