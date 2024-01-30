import { Module } from '@nestjs/common';
import { MeqsApproverService } from './meqs-approver.service';
import { MeqsApproverResolver } from './meqs-approver.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [MeqsApproverResolver, MeqsApproverService],
})
export class MeqsApproverModule {}
