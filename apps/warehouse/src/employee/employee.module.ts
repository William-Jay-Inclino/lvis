import { Module } from '@nestjs/common';
import { EmployeeResolver } from './employee.resolver';
import { HttpModule } from '@nestjs/axios';
import { CanvassService } from '../canvass/canvass.service';
import { RvService } from '../rv/rv.service';

@Module({
  imports: [HttpModule],
  providers: [EmployeeResolver, CanvassService, RvService],
})
export class EmployeeModule {}
