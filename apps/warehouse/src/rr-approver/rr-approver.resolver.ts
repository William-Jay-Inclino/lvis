import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { RrApproverService } from './rr-approver.service';
import { RrApprover } from './entities/rr-approver.entity';
import { CreateRrApproverInput } from './dto/create-rr-approver.input';
import { UpdateRrApproverInput } from './dto/update-rr-approver.input';
import { Employee } from '../__employee__/entities/employee.entity';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';
import { UpdateRrOrderResponse } from './entities/update-rr-order-response.entity';
import { UpdateRrOrderInput } from './dto/update-rr-order.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { isAdmin } from '../__common__/helpers';
@UseGuards(GqlAuthGuard)
@Resolver(() => RrApprover)
export class RrApproverResolver {
  constructor(private readonly rrApproverService: RrApproverService) { }

  @Mutation(() => RrApprover)
  createRrApprover(
    @Args('input') createRrApproverInput: CreateRrApproverInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {

    if (!isAdmin(authUser)) {
      throw new ForbiddenException('Only Admin can create RR Approver')
    }

    this.rrApproverService.setAuthUser(authUser)
    return this.rrApproverService.create(createRrApproverInput);
  }

  @Query(() => [RrApprover])
  rr_approvers(
    @Args('rr_id', { nullable: true }) rr_id?: string,
    @Args('rr_number', { nullable: true }) rr_number?: string,
  ) {
    if (rr_id) {
      return this.rrApproverService.findByRrId(rr_id)
    }
    if (rr_number) {
      return this.rrApproverService.findByRrNumber(rr_number)
    }
  }

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

    if (!isAdmin(authUser)) {
      throw new ForbiddenException('Only Admin can update RR Approver')
    }

    this.rrApproverService.setAuthUser(authUser)
    return this.rrApproverService.update(id, updateRrApproverInput);
  }

  @Mutation(() => UpdateRrOrderResponse)
  async updateRRApproverOrder(
    @Args('inputs', { type: () => [UpdateRrOrderInput] }) inputs: UpdateRrOrderInput[],
    @CurrentAuthUser() authUser: AuthUser
  ) {

    if (!isAdmin(authUser)) {
      throw new ForbiddenException('Only Admin can update RR Approver Order')
    }

    return await this.rrApproverService.updateManyOrders(inputs);

  }

  @Mutation(() => WarehouseRemoveResponse)
  removeRrApprover(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {

    if (!isAdmin(authUser)) {
      throw new ForbiddenException('Only Admin can remove RR Approver')
    }

    this.rrApproverService.setAuthUser(authUser)
    return this.rrApproverService.remove(id);
  }

  @ResolveField(() => Employee)
  approver(@Parent() rrApprover: RrApprover): any {
    return { __typename: 'Employee', id: rrApprover.approver_id }
  }


}
