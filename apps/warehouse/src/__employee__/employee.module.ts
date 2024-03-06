import { Module } from '@nestjs/common';
import { EmployeeResolver } from './employee.resolver';
import { HttpModule } from '@nestjs/axios';
import { CanvassService } from '../canvass/canvass.service';
import { RvService } from '../rv/rv.service';
import { RvApproverService } from '../rv-approver/rv-approver.service';
import { MeqsService } from '../meqs/meqs.service';
import { MeqsApproverService } from '../meqs-approver/meqs-approver.service';
import { PoApproverService } from '../po-approver/po-approver.service';
import { RrApproverService } from '../rr-approver/rr-approver.service';
import { EmployeeService } from './employee.service';

@Module({
  imports: [HttpModule],
  providers: [
    EmployeeResolver,
    EmployeeService,
    CanvassService,
    RvService,
    RvApproverService,
    MeqsService,
    MeqsApproverService,
    PoApproverService,
    RrApproverService
  ],
})
export class EmployeeModule { }
