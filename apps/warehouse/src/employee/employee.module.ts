import { Module } from '@nestjs/common';
import { EmployeeResolver } from './employee.resolver';
import { CanvassService } from '../canvass/canvass.service';
import { HttpModule } from '@nestjs/axios';
import { RvService } from '../rv/rv.service';
import { EmployeeService } from './employee.service';

@Module({
  imports: [HttpModule],
  providers: [EmployeeResolver, CanvassService, RvService, EmployeeService],
  exports: [EmployeeService]
})
export class EmployeeModule {}
