import { Module } from '@nestjs/common';
import { MeqsResolver } from './meqs.resolver';
import { MeqsService } from './meqs.service';
import { HttpModule } from '@nestjs/axios';
import { MeqsApproverService } from '../meqs-approver/meqs-approver.service';
import { MeqsController } from './meqs.controller';
import { MeqsPdfService } from './meqs.pdf.service';

@Module({
  imports: [HttpModule],
  providers: [MeqsResolver, MeqsService, MeqsPdfService, MeqsApproverService],
  controllers: [MeqsController],
})

export class MeqsModule {}
