import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { MeqsSupplierService } from './meqs-supplier.service';
import { MeqsSupplier } from './entities/meqs-supplier.entity';
import { CreateMeqsSupplierInput } from './dto/create-meqs-supplier.input';
import { UpdateMeqsSupplierInput } from './dto/update-meqs-supplier.input';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';

@Resolver(() => MeqsSupplier)
export class MeqsSupplierResolver {
  constructor(private readonly meqsSupplierService: MeqsSupplierService) { }

  @Mutation(() => MeqsSupplier)
  createMeqsSupplier(
    @Args('input') createMeqsSupplierInput: CreateMeqsSupplierInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.meqsSupplierService.setAuthUser(authUser)
    return this.meqsSupplierService.create(createMeqsSupplierInput);
  }

  // @Query(() => [MeqsSupplier])
  // meqs_suppliers() {
  //   return this.meqsSupplierService.findAll();
  // }

  @Query(() => MeqsSupplier)
  meqs_supplier(@Args('id') id: string) {
    return this.meqsSupplierService.findOne(id);
  }

  @Mutation(() => MeqsSupplier)
  updateMeqsSupplier(
    @Args('id') id: string,
    @Args('input') updateMeqsSupplierInput: UpdateMeqsSupplierInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.meqsSupplierService.setAuthUser(authUser)
    return this.meqsSupplierService.update(id, updateMeqsSupplierInput);
  }

  @Mutation(() => MeqsSupplier)
  removeMeqsSupplier(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.meqsSupplierService.setAuthUser(authUser)
    return this.meqsSupplierService.remove(id);
  }

  @ResolveField(() => Boolean)
  async is_referenced(@Parent() meqsSupplier: MeqsSupplier) {
    return await this.meqsSupplierService.isReferenced(meqsSupplier.id)
  }


}
