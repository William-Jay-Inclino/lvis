import { Module } from '@nestjs/common';
import { SprApproverService } from './spr-approver.service';
import { SprApproverResolver } from './spr-approver.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [SprApproverResolver, SprApproverService],
})
export class SprApproverModule { }
