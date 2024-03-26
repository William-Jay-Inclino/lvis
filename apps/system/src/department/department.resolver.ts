import { Resolver, Query, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AccessGuard } from '../__auth__/guards/access.guard';
import { MODULES, RESOLVERS } from '../__common__/types';
import { CheckAccess } from '../__auth__/check-access.decorator';

@UseGuards(GqlAuthGuard)
@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) { }

  @Mutation(() => Department)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.DEPARTMENT, RESOLVERS.createDepartment)
  createDepartment(
    @Args('input') createDepartmentInput: CreateDepartmentInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.departmentService.setAuthUser(authUser)
    return this.departmentService.create(createDepartmentInput);
  }

  @Query(() => [Department])
  departments() {
    return this.departmentService.findAll();
  }

  @Query(() => Department)
  department(@Args('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @Mutation(() => Department)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.DEPARTMENT, RESOLVERS.updateDepartment)
  updateDepartment(
    @Args('id') id: string,
    @Args('input') updateDepartmentInput: UpdateDepartmentInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.departmentService.setAuthUser(authUser)
    return this.departmentService.update(id, updateDepartmentInput);
  }

  @Mutation(() => SystemRemoveResponse)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.DEPARTMENT, RESOLVERS.removeDepartment)
  removeDepartment(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.departmentService.setAuthUser(authUser)
    return this.departmentService.remove(id);
  }


  @ResolveReference()
  async resolveReference(reference: { __typename: string, id: string }): Promise<Department> {
    return await this.departmentService.findOne(reference.id)
  }

}
