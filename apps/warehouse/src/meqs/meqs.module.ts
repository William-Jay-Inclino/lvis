import { Module } from '@nestjs/common';
import { MeqsResolver } from './meqs.resolver';
import { MeqsService } from './meqs.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [MeqsResolver, MeqsService],
})

export class MeqsModule {}
