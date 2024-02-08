import { Module } from '@nestjs/common';
import { RrItemService } from './rr-item.service';
import { RrItemResolver } from './rr-item.resolver';

@Module({
  providers: [RrItemResolver, RrItemService],
})
export class RrItemModule {}
