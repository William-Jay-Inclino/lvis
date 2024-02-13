import { Module } from '@nestjs/common';
import { RrService } from './rr.service';
import { RrResolver } from './rr.resolver';
import { HttpModule } from '@nestjs/axios';
import { RrApproverService } from '../rr-approver/rr-approver.service';

@Module({
  imports: [HttpModule],
  providers: [RrResolver, RrService, RrApproverService],
  exports: [RrService]
})
export class RrModule {}
