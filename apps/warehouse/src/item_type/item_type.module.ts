import { Module } from '@nestjs/common';
import { ItemTypeService } from './item_type.service';
import { ItemTypeResolver } from './item_type.resolver';

@Module({
  providers: [ItemTypeResolver, ItemTypeService],
})
export class ItemTypeModule {}
