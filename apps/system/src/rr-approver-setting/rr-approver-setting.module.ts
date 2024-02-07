import { Module } from '@nestjs/common';
import { RrApproverSettingService } from './rr-approver-setting.service';
import { RrApproverSettingResolver } from './rr-approver-setting.resolver';

@Module({
  providers: [RrApproverSettingResolver, RrApproverSettingService],
})
export class RrApproverSettingModule {}
