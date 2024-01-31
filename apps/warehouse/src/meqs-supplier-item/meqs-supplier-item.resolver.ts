import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeqsSupplierItemService } from './meqs-supplier-item.service';
import { MeqsSupplierItem } from './entities/meqs-supplier-item.entity';
import { CreateMeqsSupplierItemInput } from './dto/create-meqs-supplier-item.input';
import { UpdateMeqsSupplierItemInput } from './dto/update-meqs-supplier-item.input';

@Resolver(() => MeqsSupplierItem)
export class MeqsSupplierItemResolver {
  constructor(private readonly meqsSupplierItemService: MeqsSupplierItemService) {}

  @Mutation(() => MeqsSupplierItem)
  createMeqsSupplierItem(@Args('createMeqsSupplierItemInput') createMeqsSupplierItemInput: CreateMeqsSupplierItemInput) {
    return this.meqsSupplierItemService.create(createMeqsSupplierItemInput);
  }

  @Query(() => [MeqsSupplierItem], { name: 'meqsSupplierItem' })
  findAll() {
    return this.meqsSupplierItemService.findAll();
  }

  @Query(() => MeqsSupplierItem, { name: 'meqsSupplierItem' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.meqsSupplierItemService.findOne(id);
  }

  @Mutation(() => MeqsSupplierItem)
  updateMeqsSupplierItem(@Args('updateMeqsSupplierItemInput') updateMeqsSupplierItemInput: UpdateMeqsSupplierItemInput) {
    return this.meqsSupplierItemService.update(updateMeqsSupplierItemInput.id, updateMeqsSupplierItemInput);
  }

  @Mutation(() => MeqsSupplierItem)
  removeMeqsSupplierItem(@Args('id', { type: () => Int }) id: number) {
    return this.meqsSupplierItemService.remove(id);
  }
}
