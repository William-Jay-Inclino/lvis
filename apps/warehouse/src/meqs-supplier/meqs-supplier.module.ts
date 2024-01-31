import { Module } from '@nestjs/common';
import { MeqsSupplierService } from './meqs-supplier.service';
import { MeqsSupplierResolver } from './meqs-supplier.resolver';

@Module({
  providers: [MeqsSupplierResolver, MeqsSupplierService],
})
export class MeqsSupplierModule {}
