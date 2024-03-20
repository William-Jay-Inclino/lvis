import { Module } from '@nestjs/common';
import { JoApproverSettingService } from './jo-approver-setting.service';
import { JoApproverSettingResolver } from './jo-approver-setting.resolver';

@Module({
  providers: [JoApproverSettingResolver, JoApproverSettingService],
})
export class JoApproverSettingModule {}
