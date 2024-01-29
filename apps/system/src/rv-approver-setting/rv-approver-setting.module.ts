import { Module } from '@nestjs/common';
import { RvApproverSettingService } from './rv-approver-setting.service';
import { RvApproverSettingResolver } from './rv-approver-setting.resolver';

@Module({
  providers: [RvApproverSettingResolver, RvApproverSettingService],
})
export class RvApproverSettingModule {}
