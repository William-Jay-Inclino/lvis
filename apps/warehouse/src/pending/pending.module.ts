import { Module } from '@nestjs/common';
import { PendingService } from './pending.service';
import { PendingResolver } from './pending.resolver';

@Module({
  providers: [PendingResolver, PendingService],
})
export class PendingModule {}
