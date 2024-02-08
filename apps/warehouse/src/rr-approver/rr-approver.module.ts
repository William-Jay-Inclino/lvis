import { Module } from '@nestjs/common';
import { RrApproverService } from './rr-approver.service';
import { RrApproverResolver } from './rr-approver.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [RrApproverResolver, RrApproverService],
})
export class RrApproverModule {}
