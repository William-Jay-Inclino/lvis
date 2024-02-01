import { Module } from '@nestjs/common';
import { EmployeeResolver } from './employee.resolver';
import { HttpModule } from '@nestjs/axios';
import { CanvassService } from '../canvass/canvass.service';
import { RvService } from '../rv/rv.service';
import { RvApproverService } from '../rv-approver/rv-approver.service';
import { MeqsService } from '../meqs/meqs.service';

@Module({
  imports: [HttpModule],
  providers: [EmployeeResolver, CanvassService, RvService, RvApproverService, MeqsService],
})
export class EmployeeModule {}
