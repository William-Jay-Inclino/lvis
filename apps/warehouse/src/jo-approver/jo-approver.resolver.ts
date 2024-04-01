import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { JoApproverService } from './jo-approver.service';
import { JOApprover } from './entities/jo-approver.entity';
import { CreateJoApproverInput } from './dto/create-jo-approver.input';
import { UpdateJoApproverInput } from './dto/update-jo-approver.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { Employee } from '../__employee__/entities/employee.entity';
import { UpdateJOOrderResponse } from './entities/update-jo-order-response.entity';
import { UpdateJOOrderInput } from './dto/update-jo-order.input'
import { isAdmin } from '../__common__/helpers';

@UseGuards(GqlAuthGuard)
@Resolver(() => JOApprover)
export class JoApproverResolver {
  constructor(private readonly joApproverService: JoApproverService) { }

  @Mutation(() => JOApprover)
  createJoApprover(
    @Args('input') createJoApproverInput: CreateJoApproverInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {

    if (!isAdmin(authUser)) {
      throw new ForbiddenException('Only Admin can create JO Approver')
    }

    this.joApproverService.setAuthUser(authUser)
    return this.joApproverService.create(createJoApproverInput);
  }

  @Query(() => [JOApprover])
  jo_approvers(
    @Args('jo_id', { nullable: true }) jo_id?: string,
    @Args('jo_number', { nullable: true }) jo_number?: string,
  ) {
    if (jo_id) {
      return this.joApproverService.findByJoId(jo_id)
    }
    if (jo_number) {
      return this.joApproverService.findByJoNumber(jo_number)
    }
  }

  @Query(() => JOApprover)
  jo_approver(@Args('id') id: string) {
    return this.joApproverService.findOne(id);
  }

  @Mutation(() => JOApprover)
  updateJoApprover(
    @Args('id') id: string,
    @Args('input') updateJoApproverInput: UpdateJoApproverInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.joApproverService.setAuthUser(authUser)
    return this.joApproverService.update(id, updateJoApproverInput);
  }

  @Mutation(() => UpdateJOOrderResponse)
  async updateJOApproverOrder(
    @Args('inputs', { type: () => [UpdateJOOrderInput] }) inputs: UpdateJOOrderInput[],
    @CurrentAuthUser() authUser: AuthUser
  ) {

    if (!isAdmin(authUser)) {
      throw new ForbiddenException('Only Admin can update JO Approver Order')
    }

    return await this.joApproverService.updateManyOrders(inputs);

  }

  @Mutation(() => WarehouseRemoveResponse)
  removeJoApprover(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {

    if (!isAdmin(authUser)) {
      throw new ForbiddenException('Only Admin can remove JO Approver')
    }

    this.joApproverService.setAuthUser(authUser)
    return this.joApproverService.remove(id);
  }

  @ResolveField(() => Employee)
  approver(@Parent() joApprover: JOApprover): any {
    return { __typename: 'Employee', id: joApprover.approver_id }
  }

}
