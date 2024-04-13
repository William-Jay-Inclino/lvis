import { Module } from '@nestjs/common';
import { PoResolver } from './po.resolver';
import { PoService } from './po.service';
import { HttpModule } from '@nestjs/axios';
import { PoApproverService } from '../po-approver/po-approver.service';
import { PoController } from './po.controller';
import { PoPdfService } from './po.pdf.service';

@Module({
  imports: [HttpModule],
  providers: [PoResolver, PoService, PoPdfService, PoApproverService],
  exports: [PoService],
  controllers: [PoController]
})
export class PoModule {}
