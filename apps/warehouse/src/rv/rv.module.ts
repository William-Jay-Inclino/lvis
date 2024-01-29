import { Module } from '@nestjs/common';
import { RvResolver } from './rv.resolver';
import { RvService } from './rv.service';
import { EmployeeService } from '../employee/employee.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [RvResolver, RvService, EmployeeService]
})
export class RvModule {}
