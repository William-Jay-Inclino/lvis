import { Module } from '@nestjs/common';
import { RvApproverService } from './rv-approver.service';
import { RvApproverResolver } from './rv-approver.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [RvApproverResolver, RvApproverService],
})
export class RvApproverModule {}
