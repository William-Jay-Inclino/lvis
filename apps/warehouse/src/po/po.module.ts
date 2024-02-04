import { Module } from '@nestjs/common';
import { PoResolver } from './po.resolver';
import { PoService } from './po.service';
import { HttpModule } from '@nestjs/axios';
import { PoApproverService } from '../po-approver/po-approver.service';

@Module({
  imports: [HttpModule],
  providers: [PoResolver, PoService, PoApproverService],
  exports: [PoService]
})
export class PoModule {}
