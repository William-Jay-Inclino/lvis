import { Module } from '@nestjs/common';
import { MeqsApproverSettingService } from './meqs-approver-setting.service';
import { MeqsApproverSettingResolver } from './meqs-approver-setting.resolver';

@Module({
  providers: [MeqsApproverSettingResolver, MeqsApproverSettingService],
})
export class MeqsApproverSettingModule {}
