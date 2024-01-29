import { Module } from '@nestjs/common';
import { CanvassService } from './canvass.service';
import { CanvassResolver } from './canvass.resolver';
import { HttpModule } from '@nestjs/axios';
import { EmployeeService } from '../employee/employee.service';

@Module({
  imports: [HttpModule],
  providers: [CanvassService, CanvassResolver, EmployeeService],
})
export class CanvassModule {}
