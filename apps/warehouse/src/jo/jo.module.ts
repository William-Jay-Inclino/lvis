import { Module } from '@nestjs/common';
import { JoService } from './jo.service';
import { JoResolver } from './jo.resolver';
import { HttpModule } from '@nestjs/axios';
import { CanvassService } from '../canvass/canvass.service';
import { JoApproverService } from '../jo-approver/jo-approver.service';
import { JoController } from './jo.controller';
import { JoPdfService } from './jo.pdf.service';

@Module({
  imports: [HttpModule],
  providers: [JoService, JoResolver, JoPdfService, JoApproverService, CanvassService],
  exports: [JoService],
  controllers: [JoController]
})
export class JoModule { }
