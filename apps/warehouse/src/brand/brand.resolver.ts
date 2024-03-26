import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';
import { CreateBrandInput } from './dto/create-brand.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UpdateBrandInput } from './dto/update-brand.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AccessGuard } from '../__auth__/guards/access.guard';
import { CheckAccess } from '../__auth__/check-access.decorator';
import { MODULES, RESOLVERS } from '../__common__/types';

@UseGuards(GqlAuthGuard)
@Resolver(() => Brand)
export class BrandResolver {
  constructor(private readonly brandService: BrandService) { }

  @Mutation(() => Brand)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.ITEM_BRAND, RESOLVERS.createBrand)
  createBrand(
    @Args('input') createBrandInput: CreateBrandInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.brandService.setAuthUser(authUser)
    return this.brandService.create(createBrandInput);
  }

  @Query(() => [Brand])
  brands() {
    return this.brandService.findAll();
  }

  @Query(() => Brand)
  brand(@Args('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Mutation(() => Brand)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.ITEM_BRAND, RESOLVERS.updateBrand)
  updateBrand(
    @Args('id') id: string,
    @Args('input') updateBrandInput: UpdateBrandInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.brandService.setAuthUser(authUser)
    return this.brandService.update(id, updateBrandInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.ITEM_BRAND, RESOLVERS.removeBrand)
  removeBrand(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.brandService.setAuthUser(authUser)
    return this.brandService.remove(id);
  }

}
