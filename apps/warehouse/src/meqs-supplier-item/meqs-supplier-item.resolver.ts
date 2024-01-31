import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MeqsSupplierItemService } from './meqs-supplier-item.service';
import { MeqsSupplierItem } from './entities/meqs-supplier-item.entity';
import { CreateMeqsSupplierItemInput } from './dto/create-meqs-supplier-item.input';
import { UpdateMeqsSupplierItemInput } from './dto/update-meqs-supplier-item.input';

@Resolver(() => MeqsSupplierItem)
export class MeqsSupplierItemResolver {
  constructor(private readonly meqsSupplierItemService: MeqsSupplierItemService) {}

  @Mutation(() => MeqsSupplierItem)
  createMeqsSupplierItem(@Args('input') createMeqsSupplierItemInput: CreateMeqsSupplierItemInput) {
    return this.meqsSupplierItemService.create(createMeqsSupplierItemInput);
  }

  @Query(() => [MeqsSupplierItem])
  meqs_supplier_items() {
    return this.meqsSupplierItemService.findAll();
  }

  @Query(() => MeqsSupplierItem)
  meqs_supplier_item(@Args('id') id: string) {
    return this.meqsSupplierItemService.findOne(id);
  }

  @Mutation(() => MeqsSupplierItem)
  updateMeqsSupplierItem(
    @Args('id') id: string,
    @Args('input') updateMeqsSupplierItemInput: UpdateMeqsSupplierItemInput
  ) {
    return this.meqsSupplierItemService.update(id, updateMeqsSupplierItemInput);
  }

  @Mutation(() => MeqsSupplierItem)
  removeMeqsSupplierItem(@Args('id') id: string) {
    return this.meqsSupplierItemService.remove(id);
  }
}
