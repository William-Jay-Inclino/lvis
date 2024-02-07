import { Module } from '@nestjs/common';
import { PoApproverSettingService } from './po-approver-setting.service';
import { PoApproverSettingResolver } from './po-approver-setting.resolver';

@Module({
  providers: [PoApproverSettingResolver, PoApproverSettingService],
})
export class PoApproverSettingModule {}
