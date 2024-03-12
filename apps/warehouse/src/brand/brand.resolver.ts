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

@UseGuards(GqlAuthGuard)
@Resolver(() => Brand)
export class BrandResolver {
  constructor(private readonly brandService: BrandService) { }

  @Mutation(() => Brand)
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
  updateBrand(
    @Args('id') id: string,
    @Args('input') updateBrandInput: UpdateBrandInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.brandService.setAuthUser(authUser)
    return this.brandService.update(id, updateBrandInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  removeBrand(@Args('id') id: string) {
    return this.brandService.remove(id);
  }

}
