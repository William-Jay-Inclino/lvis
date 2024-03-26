import { Resolver, Query, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { SystemRemoveResponse } from '../__common__/classes';
import { EmployeesResponse } from './entities/employees-response.entity';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AccessGuard } from '../__auth__/guards/access.guard';
import { MODULES, RESOLVERS } from '../__common__/types';
import { CheckAccess } from '../__auth__/check-access.decorator';

@UseGuards(GqlAuthGuard)
@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) { }

  @Mutation(() => Employee)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.EMPLOYEE, RESOLVERS.createDepartment)
  createEmployee(
    @Args('input') createEmployeeInput: CreateEmployeeInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.employeeService.setAuthUser(authUser)
    return this.employeeService.create(createEmployeeInput);
  }

  @Query(() => EmployeesResponse)
  employees(
    @Args('page') page?: number,
    @Args('pageSize') pageSize?: number,
    @Args('searchValue', { nullable: true }) searchValue?: string,
  ) {
    return this.employeeService.findAll(page, pageSize, searchValue);
  }

  @Query(() => [Employee])
  employeesByName(
    @Args('name') name: string,
  ) {
    return this.employeeService.findEmployeesByName(name);
  }

  @Query(() => Employee)
  employee(@Args('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Mutation(() => Employee)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.EMPLOYEE, RESOLVERS.updateEmployee)
  updateEmployee(
    @Args('id') id: string,
    @Args('input') updateEmployeeInput: UpdateEmployeeInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.employeeService.setAuthUser(authUser)
    return this.employeeService.update(id, updateEmployeeInput);
  }

  @Mutation(() => SystemRemoveResponse)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.EMPLOYEE, RESOLVERS.removeEmployee)
  removeEmployee(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.employeeService.setAuthUser(authUser)
    return this.employeeService.remove(id);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string, id?: string, ids?: string[] }): Promise<Employee | Employee[]> {

    console.log('reference', reference)

    if (reference.__typename === 'Employee') {
      return await this.employeeService.findOne(reference.id)
    }

    if (reference.__typename === 'Employees') {
      return await this.employeeService.findByIds(reference.ids)
    }

  }

  @Query(() => Boolean)
  async validateEmployeeIds(@Args('ids', { type: () => [String] }) ids: string[]): Promise<boolean> {
    return this.employeeService.validateEmployeeIds(ids);
  }

}
