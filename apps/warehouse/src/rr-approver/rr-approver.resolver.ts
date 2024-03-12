import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { RrApproverService } from './rr-approver.service';
import { RrApprover } from './entities/rr-approver.entity';
import { CreateRrApproverInput } from './dto/create-rr-approver.input';
import { UpdateRrApproverInput } from './dto/update-rr-approver.input';
import { Employee } from '../__employee__/entities/employee.entity';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';
import { UpdateRrOrderResponse } from './entities/update-rr-order-response.entity';
import { UpdateRrOrderInput } from './dto/update-rr-order.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
@UseGuards(GqlAuthGuard)
@Resolver(() => RrApprover)
export class RrApproverResolver {
  constructor(private readonly rrApproverService: RrApproverService) { }

  @Mutation(() => RrApprover)
  createRrApprover(
    @Args('input') createRrApproverInput: CreateRrApproverInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.rrApproverService.setAuthUser(authUser)
    return this.rrApproverService.create(createRrApproverInput);
  }

  // @Query(() => [RrApprover])
  // rr_approvers() {
  //   return this.rrApproverService.findAll();
  // }

  @Query(() => RrApprover)
  rr_approver(@Args('id') id: string) {
    return this.rrApproverService.findOne(id);
  }

  @Mutation(() => RrApprover)
  updateRrApprover(
    @Args('id') id: string,
    @Args('input') updateRrApproverInput: UpdateRrApproverInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.rrApproverService.setAuthUser(authUser)
    return this.rrApproverService.update(id, updateRrApproverInput);
  }

  @Mutation(() => UpdateRrOrderResponse)
  async updateRRApproverOrder(@Args('inputs', { type: () => [UpdateRrOrderInput] }) inputs: UpdateRrOrderInput[]) {

    return await this.rrApproverService.updateManyOrders(inputs);

  }

  @Mutation(() => WarehouseRemoveResponse)
  removeRrApprover(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.rrApproverService.setAuthUser(authUser)
    return this.rrApproverService.remove(id);
  }

  @ResolveField(() => Employee)
  approver(@Parent() rrApprover: RrApprover): any {
    return { __typename: 'Employee', id: rrApprover.approver_id }
  }


}
