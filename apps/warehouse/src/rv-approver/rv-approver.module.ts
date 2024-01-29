import { Module } from '@nestjs/common';
import { RvApproverService } from './rv-approver.service';
import { RvApproverResolver } from './rv-approver.resolver';

@Module({
  providers: [RvApproverResolver, RvApproverService],
})
export class RvApproverModule {}
