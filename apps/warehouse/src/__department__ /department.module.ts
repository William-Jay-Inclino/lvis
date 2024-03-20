import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CanvassService } from '../canvass/canvass.service';
import { DepartmentResolver } from 'apps/system/src/department/department.resolver';
import { JoService } from '../jo/jo.service';

@Module({
  imports: [HttpModule],
  providers: [DepartmentResolver, JoService, CanvassService],
})
export class DepartmentModule { }
