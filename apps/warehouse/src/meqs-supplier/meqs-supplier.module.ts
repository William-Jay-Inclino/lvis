import { Module } from '@nestjs/common';
import { MeqsSupplierService } from './meqs-supplier.service';
import { MeqsSupplierResolver } from './meqs-supplier.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [MeqsSupplierResolver, MeqsSupplierService],
})
export class MeqsSupplierModule { }
