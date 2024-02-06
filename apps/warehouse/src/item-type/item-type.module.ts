import { Module } from '@nestjs/common';
import { ItemTypeService } from './item-type.service';
import { ItemTypeResolver } from './item-type.resolver';

@Module({
  providers: [ItemTypeResolver, ItemTypeService],
})
export class ItemTypeModule {}
