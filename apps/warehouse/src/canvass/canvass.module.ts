import { Module } from '@nestjs/common';
import { CanvassService } from './canvass.service';
import { CanvassResolver } from './canvass.resolver';
import { EmployeeResolver } from './employee.resolver';

@Module({
  providers: [CanvassService, CanvassResolver, EmployeeResolver],
})
export class CanvassModule {}
