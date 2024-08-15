import { Module } from '@nestjs/common';
import { PendingService } from './pending.service';
import { PendingResolver } from './pending.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PendingResolver, PendingService],
})
export class PendingModule {}
