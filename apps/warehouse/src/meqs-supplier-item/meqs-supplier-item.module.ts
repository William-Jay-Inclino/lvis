import { Module } from '@nestjs/common';
import { MeqsSupplierItemService } from './meqs-supplier-item.service';
import { MeqsSupplierItemResolver } from './meqs-supplier-item.resolver';

@Module({
  providers: [MeqsSupplierItemResolver, MeqsSupplierItemService],
})
export class MeqsSupplierItemModule {}
