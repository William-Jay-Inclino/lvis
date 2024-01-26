import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
// import { UpdateEmployeeInput } from './dto/update-employee.input';

@UseGuards(GqlAuthGuard)
@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Mutation(() => Employee)
  createEmployee(@Args('input') createEmployeeInput: CreateEmployeeInput) {
    return this.employeeService.create(createEmployeeInput);
  }

  @Query(() => [Employee])
  employees() {
    return this.employeeService.findAll();
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

  @Mutation(() => Boolean)
  removeEmployee(@Args('id', { type: () => String }) id: string) {
    return this.employeeService.remove(id);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string, id: string }): Promise<Employee> {
    return await this.employeeService.findOne(reference.id)
  }
}
