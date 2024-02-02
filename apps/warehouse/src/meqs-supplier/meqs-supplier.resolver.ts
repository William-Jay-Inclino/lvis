import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeqsSupplierService } from './meqs-supplier.service';
import { MeqsSupplier } from './entities/meqs-supplier.entity';
import { CreateMeqsSupplierInput } from './dto/create-meqs-supplier.input';
import { UpdateMeqsSupplierInput } from './dto/update-meqs-supplier.input';

@Resolver(() => MeqsSupplier)
export class MeqsSupplierResolver {
  constructor(private readonly meqsSupplierService: MeqsSupplierService) {}

  @Mutation(() => MeqsSupplier)
  createMeqsSupplier(@Args('input') createMeqsSupplierInput: CreateMeqsSupplierInput) {
    return this.meqsSupplierService.create(createMeqsSupplierInput);
  }

  @Query(() => [MeqsSupplier])
  meqs_suppliers() {
    return this.meqsSupplierService.findAll();
  }

  @Query(() => MeqsSupplier)
  meqs_supplier(@Args('id') id: string) {
    return this.meqsSupplierService.findOne(id);
  }

  @Mutation(() => MeqsSupplier)
  updateMeqsSupplier(
    @Args('id') id: string,
    @Args('input') updateMeqsSupplierInput: UpdateMeqsSupplierInput
  ) {
    return this.meqsSupplierService.update(id, updateMeqsSupplierInput);
  }

  @Mutation(() => MeqsSupplier)
  removeMeqsSupplier(@Args('id') id: string) {
    return this.meqsSupplierService.remove(id);
  }
}
