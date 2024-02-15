import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { SystemRemoveResponse } from '../__common__/classes';
import { EmployeesResponse } from './entities/employees-response.entity';
// import { UpdateEmployeeInput } from './dto/update-employee.input';

@UseGuards(GqlAuthGuard)
@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Mutation(() => Employee)
  createEmployee(@Args('input') createEmployeeInput: CreateEmployeeInput) {
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

  @Query(() => Employee)
  employee(@Args('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Mutation(() => Employee)
  updateEmployee(
    @Args('id') id: string,
    @Args('input') updateEmployeeInput: UpdateEmployeeInput
  ) {
    return this.employeeService.update(id, updateEmployeeInput);
  }

  @Mutation(() => SystemRemoveResponse)
  removeEmployee(@Args('id') id: string) {
    return this.employeeService.remove(id);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string, id?: string, ids?: string[] }): Promise<Employee | Employee[]> {

    console.log('reference', reference)

    if(reference.__typename === 'Employee'){
      return await this.employeeService.findOne(reference.id)
    }

    if(reference.__typename === 'Employees'){
      return await this.employeeService.findByIds(reference.ids)
    }

  }

  @Query(() => Boolean)
  async validateEmployeeIds(@Args('ids', { type: () => [String] }) ids: string[]): Promise<boolean> {
    return this.employeeService.validateEmployeeIds(ids);
  }

}
