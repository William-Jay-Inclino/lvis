import { Module } from '@nestjs/common';
import { SprService } from './spr.service';
import { SprResolver } from './spr.resolver';
import { HttpModule } from '@nestjs/axios';
import { CanvassService } from '../canvass/canvass.service';
import { SprApproverService } from '../spr-approver/spr-approver.service';

@Module({
  imports: [HttpModule],
  providers: [SprService, SprResolver, SprApproverService, CanvassService],
  exports: [SprService]
})
export class SprModule { }
