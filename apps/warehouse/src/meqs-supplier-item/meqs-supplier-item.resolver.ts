import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MeqsSupplierItemService } from './meqs-supplier-item.service';
import { MeqsSupplierItem } from './entities/meqs-supplier-item.entity';
import { CreateMeqsSupplierItemInput } from './dto/create-meqs-supplier-item.input';
import { UpdateMeqsSupplierItemInput } from './dto/update-meqs-supplier-item.input';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver(() => MeqsSupplierItem)
export class MeqsSupplierItemResolver {
  constructor(private readonly meqsSupplierItemService: MeqsSupplierItemService) { }

  @Mutation(() => MeqsSupplierItem)
  createMeqsSupplierItem(
    @Args('input') createMeqsSupplierItemInput: CreateMeqsSupplierItemInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.meqsSupplierItemService.setAuthUser(authUser)
    return this.meqsSupplierItemService.create(createMeqsSupplierItemInput);
  }

  @Query(() => MeqsSupplierItem)
  meqs_supplier_item(@Args('id') id: string) {
    return this.meqsSupplierItemService.findOne(id);
  }

  @Mutation(() => MeqsSupplierItem)
  updateMeqsSupplierItem(
    @Args('id') id: string,
    @Args('input') updateMeqsSupplierItemInput: UpdateMeqsSupplierItemInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.meqsSupplierItemService.setAuthUser(authUser)
    return this.meqsSupplierItemService.update(id, updateMeqsSupplierItemInput);
  }

  @Mutation(() => MeqsSupplierItem)
  removeMeqsSupplierItem(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.meqsSupplierItemService.setAuthUser(authUser)
    return this.meqsSupplierItemService.remove(id);
  }

  @Mutation(() => WarehouseRemoveResponse)
  awardMeqsSupplierItem(
    @Args('id') id: string,
    @Args('meqs_supplier_id') meqs_supplier_id: string,
    @Args('canvass_item_id') canvass_item_id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.meqsSupplierItemService.setAuthUser(authUser)
    return this.meqsSupplierItemService.awardSupplier(id, meqs_supplier_id, canvass_item_id);
  }

}
