import { Module } from '@nestjs/common';
import { RrApproverService } from './rr-approver.service';
import { RrApproverResolver } from './rr-approver.resolver';

@Module({
  providers: [RrApproverResolver, RrApproverService],
})
export class RrApproverModule {}
