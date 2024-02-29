import { Module } from '@nestjs/common';
import { StationService } from './station.service';
import { StationResolver } from './station.resolver';

@Module({
  providers: [StationResolver, StationService],
})
export class StationModule {}
