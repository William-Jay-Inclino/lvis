import { Module } from '@nestjs/common';
import { JoService } from './jo.service';
import { JoResolver } from './jo.resolver';
import { HttpModule } from '@nestjs/axios';
import { CanvassService } from '../canvass/canvass.service';
import { JoApproverService } from '../jo-approver/jo-approver.service';

@Module({
  imports: [HttpModule],
  providers: [JoService, JoResolver, JoApproverService, CanvassService],
  exports: [JoService]
})
export class JoModule { }
