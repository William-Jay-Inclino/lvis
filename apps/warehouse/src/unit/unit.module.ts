import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitResolver } from './unit.resolver';

@Module({
  providers: [UnitResolver, UnitService],
})
export class UnitModule {}
