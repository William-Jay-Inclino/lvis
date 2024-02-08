import { Module } from '@nestjs/common';
import { RrService } from './rr.service';
import { RrResolver } from './rr.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [RrResolver, RrService],
  exports: [RrService]
})
export class RrModule {}
