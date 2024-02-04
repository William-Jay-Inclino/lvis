import { Module } from '@nestjs/common';
import { PoResolver } from './po.resolver';
import { PoService } from './po.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PoResolver, PoService],
  exports: [PoService]
})
export class PoModule {}
