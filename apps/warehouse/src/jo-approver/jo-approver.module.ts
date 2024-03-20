import { Module } from '@nestjs/common';
import { JoApproverService } from './jo-approver.service';
import { JoApproverResolver } from './jo-approver.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [JoApproverResolver, JoApproverService],
})
export class JoApproverModule { }
