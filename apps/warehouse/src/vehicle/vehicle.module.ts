import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleResolver } from './vehicle.resolver';

@Module({
  providers: [VehicleResolver, VehicleService],
})
export class VehicleModule {}
