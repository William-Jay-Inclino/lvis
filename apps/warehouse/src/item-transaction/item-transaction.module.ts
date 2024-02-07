import { Module } from '@nestjs/common';
import { ItemTransactionService } from './item-transaction.service';
import { ItemTransactionResolver } from './item-transaction.resolver';

@Module({
  providers: [ItemTransactionResolver, ItemTransactionService],
})
export class ItemTransactionModule {}
