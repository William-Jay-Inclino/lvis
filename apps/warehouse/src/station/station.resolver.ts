import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StationService } from './station.service';
import { Station } from './entities/station.entity';
import { CreateStationInput } from './dto/create-station.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UpdateStationInput } from './dto/update-station.input';
import { WarehouseRemoveResponse } from '../__common__/classes';

@UseGuards(GqlAuthGuard)
@Resolver(() => Station)
export class StationResolver {
  constructor(private readonly stationService: StationService) {}

  @Mutation(() => Station)
  createStation(@Args('input') createStationInput: CreateStationInput) {
    return this.stationService.create(createStationInput);
  }

  @Query(() => [Station])
  stations() {
    return this.stationService.findAll();
  }

  @Query(() => Station)
  station(@Args('id') id: string) {
    return this.stationService.findOne(id);
  }

  @Mutation(() => Station)
  updateStation(
    @Args('id') id: string,
    @Args('input') updateStationInput: UpdateStationInput
  ) {
    return this.stationService.update(id, updateStationInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  removeSupplier(@Args('id') id: string) {
    return this.stationService.remove(id);
  }

}
