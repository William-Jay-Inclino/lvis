import { Module } from '@nestjs/common';
import { RvResolver } from './rv.resolver';
import { RvService } from './rv.service';
import { HttpModule } from '@nestjs/axios';
import { RvApproverService } from '../rv-approver/rv-approver.service';
import { CanvassService } from '../canvass/canvass.service';

@Module({
  imports: [HttpModule],
  providers: [RvResolver, RvService, RvApproverService, CanvassService],
  exports: [RvService]
})
export class RvModule {}
