import { Module } from '@nestjs/common';
import { RrService } from './rr.service';
import { RrResolver } from './rr.resolver';
import { HttpModule } from '@nestjs/axios';
import { RrApproverService } from '../rr-approver/rr-approver.service';
import { RrController } from './rr.controller';
import { RrPdfService } from './rr.pdf.service';

@Module({
  imports: [HttpModule],
  providers: [RrResolver, RrService, RrPdfService, RrApproverService],
  exports: [RrService],
  controllers: [RrController]
})
export class RrModule {}
