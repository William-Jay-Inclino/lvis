import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SupplierService } from './supplier.service';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { WarehouseRemoveResponse } from '../__common__/classes';

@UseGuards(GqlAuthGuard)
@Resolver(() => Supplier)
export class SupplierResolver {
  constructor(private readonly supplierService: SupplierService) {}

  @Mutation(() => Supplier)
  createSupplier(@Args('input') createSupplierInput: CreateSupplierInput) {
    return this.supplierService.create(createSupplierInput);
  }

  @Query(() => [Supplier])
  suppliers() {
    return this.supplierService.findAll();
  }

  @Query(() => Supplier)
  supplier(@Args('id') id: string) {
    return this.supplierService.findOne(id);
  }

  @Mutation(() => Supplier)
  updateSupplier(
    @Args('id') id: string,
    @Args('input') updateSupplierInput: UpdateSupplierInput
  ) {
    return this.supplierService.update(id, updateSupplierInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  removeSupplier(@Args('id') id: string) {
    return this.supplierService.remove(id);
  }

}
