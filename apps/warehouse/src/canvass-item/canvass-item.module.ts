import { Module } from '@nestjs/common';
import { CanvassItemService } from './canvass-item.service';
import { CanvassItemResolver } from './canvass-item.resolver';

@Module({
  providers: [CanvassItemService, CanvassItemResolver]
})
export class CanvassItemModule {}
