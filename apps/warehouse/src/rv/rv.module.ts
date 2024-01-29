import { Module } from '@nestjs/common';
import { RvResolver } from './rv.resolver';
import { RvService } from './rv.service';

@Module({
  providers: [RvResolver, RvService]
})
export class RvModule {}
