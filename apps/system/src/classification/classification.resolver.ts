import { Resolver, Query, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { ClassificationService } from './classification.service';
import { Classification } from './entities/classification.entity';
import { CreateClassificationInput } from './dto/create-classification.input';
import { UpdateClassificationInput } from './dto/update-classification.input';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { SystemRemoveResponse } from '../__common__/classes';
import { AccessGuard } from '../__auth__/guards/access.guard';
import { CheckAccess } from '../__auth__/check-access.decorator';
import { MODULES, RESOLVERS } from '../__common__/types';

@UseGuards(GqlAuthGuard)
@Resolver(() => Classification)
export class ClassificationResolver {
  constructor(private readonly classificationService: ClassificationService) { }

  @Mutation(() => Classification)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.CLASSIFICATION, RESOLVERS.createClassification)
  createClassification(
    @Args('input') createClassificationInput: CreateClassificationInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.classificationService.setAuthUser(authUser)
    return this.classificationService.create(createClassificationInput);
  }

  @Query(() => [Classification])
  classifications() {
    return this.classificationService.findAll();
  }

  @Query(() => Classification)
  classification(@Args('id') id: string) {
    return this.classificationService.findOne(id);
  }

  @Mutation(() => Classification)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.CLASSIFICATION, RESOLVERS.updateClassification)
  updateClassification(
    @Args('id') id: string,
    @Args('input') updateClassificationInput: UpdateClassificationInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.classificationService.setAuthUser(authUser)
    return this.classificationService.update(id, updateClassificationInput);
  }

  @Mutation(() => SystemRemoveResponse)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.CLASSIFICATION, RESOLVERS.removeClassification)
  removeClassification(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.classificationService.setAuthUser(authUser)
    return this.classificationService.remove(id);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string, id: string }): Promise<Classification> {
    return await this.classificationService.findOne(reference.id)
  }

}
