import { Module } from '@nestjs/common';
import { PoApproverService } from './po-approver.service';
import { PoApproverResolver } from './po-approver.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PoApproverResolver, PoApproverService],
  exports: [PoApproverService]
})
export class PoApproverModule {}
