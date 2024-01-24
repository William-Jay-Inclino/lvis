import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';
import { CreateBrandInput } from './dto/create-brand.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from 'apps/system/src/user/entities/user.entity';

@UseGuards(GqlAuthGuard)
@Resolver(() => Brand)
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Mutation(() => Brand)
  createBrand(@Args('input') createBrandInput: CreateBrandInput) {
    return this.brandService.create(createBrandInput);
  }

  @Query(() => [Brand])
  brands(@CurrentUser() user: User) {
    console.log('brand current-user', user)
    return this.brandService.findAll();
  }

  @Query(() => Brand)
  brand(@Args('id') id: string) {
    return this.brandService.findOne(id);
  }
}
