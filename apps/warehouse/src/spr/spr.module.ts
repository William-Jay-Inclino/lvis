import { Module } from '@nestjs/common';
import { SprService } from './spr.service';
import { SprResolver } from './spr.resolver';
import { HttpModule } from '@nestjs/axios';
import { CanvassService } from '../canvass/canvass.service';
import { SprApproverService } from '../spr-approver/spr-approver.service';
import { SprController } from './spr.controller';
import { SprPdfService } from './spr.pdf.service';

@Module({
  imports: [HttpModule],
  providers: [SprService, SprResolver, SprPdfService, SprApproverService, CanvassService],
  exports: [SprService],
  controllers: [SprController]
})
export class SprModule { }
