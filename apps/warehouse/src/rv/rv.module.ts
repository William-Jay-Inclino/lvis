import { Module } from '@nestjs/common';
import { RvResolver } from './rv.resolver';
import { RvService } from './rv.service';
import { HttpModule } from '@nestjs/axios';
import { RvApproverService } from '../rv-approver/rv-approver.service';
import { CanvassService } from '../canvass/canvass.service';
import { RvController } from './rv.controller';
import { RvPdfService } from './rv.pdf.service';

@Module({
  imports: [HttpModule],
  providers: [RvResolver, RvService, RvPdfService, RvApproverService, CanvassService],
  exports: [RvService],
  controllers: [RvController]
})
export class RvModule { }
