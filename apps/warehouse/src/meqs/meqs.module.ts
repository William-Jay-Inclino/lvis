import { Module } from '@nestjs/common';
import { MeqsResolver } from './meqs.resolver';
import { MeqsService } from './meqs.service';
import { HttpModule } from '@nestjs/axios';
import { MeqsApproverService } from '../meqs-approver/meqs-approver.service';

@Module({
  imports: [HttpModule],
  providers: [MeqsResolver, MeqsService, MeqsApproverService],
})

export class MeqsModule {}
