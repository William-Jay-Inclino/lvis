import { Module } from '@nestjs/common';
import { SprApproverSettingService } from './spr-approver-setting.service';
import { SprApproverSettingResolver } from './spr-approver-setting.resolver';

@Module({
  providers: [SprApproverSettingResolver, SprApproverSettingService],
})
export class SprApproverSettingModule {}
