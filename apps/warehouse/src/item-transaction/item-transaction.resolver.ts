import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemTransactionService } from './item-transaction.service';
import { ItemTransaction } from './entities/item-transaction.entity';
import { CreateItemTransactionInput } from './dto/create-item-transaction.input';
import { UpdateItemTransactionInput } from './dto/update-item-transaction.input';
import { WarehouseRemoveResponse } from '../__common__/classes';

@Resolver(() => ItemTransaction)
export class ItemTransactionResolver {
  constructor(private readonly itemTransactionService: ItemTransactionService) {}

  @Mutation(() => ItemTransaction)
  createItemTransaction(@Args('input') createItemTransactionInput: CreateItemTransactionInput) {
    return this.itemTransactionService.create(createItemTransactionInput);
  }

  @Query(() => [ItemTransaction])
  item_transactions() {
    return this.itemTransactionService.findAll();
  }

  @Query(() => ItemTransaction)
  item_transaction(@Args('id') id: string) {
    return this.itemTransactionService.findOne(id);
  }

  @Mutation(() => ItemTransaction)
  updateItemTransaction(
    @Args('id') id: string,
    @Args('input') updateItemTransactionInput: UpdateItemTransactionInput
  ) {
    return this.itemTransactionService.update(id, updateItemTransactionInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  removeItemTransaction(@Args('id') id: string) {
    return this.itemTransactionService.remove(id);
  }
}
