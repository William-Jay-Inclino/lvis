import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { PoApproverService } from './po-approver.service';
import { CreatePoApproverInput } from './dto/create-po-approver.input';
import { UpdatePoApproverInput } from './dto/update-po-approver.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { Employee } from '../__employee__/entities/employee.entity';
import { UpdatePoOrderResponse } from './entities/update-po-order-response.entity';
import { UpdatePoOrderInput } from './dto/update-po-order.input';
import { POApprover } from './entities/po-approver.entity';
import { isAdmin } from '../__common__/helpers';

@UseGuards(GqlAuthGuard)
@Resolver(() => POApprover)
export class PoApproverResolver {
  constructor(private readonly poApproverService: PoApproverService) { }

  @Mutation(() => POApprover)
  createPoApprover(
    @Args('input') createPoApproverInput: CreatePoApproverInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {

    if (!isAdmin(authUser)) {
      throw new ForbiddenException('Only Admin can create PO Approver')
    }

    this.poApproverService.setAuthUser(authUser)
    return this.poApproverService.create(createPoApproverInput);
  }

  @Query(() => [POApprover])
  po_approvers(
    @Args('po_id', { nullable: true }) po_id?: string,
    @Args('po_number', { nullable: true }) po_number?: string,
  ) {
    if (po_id) {
      return this.poApproverService.findByPoId(po_id)
    }
    if (po_number) {
      return this.poApproverService.findByPoNumber(po_number)
    }
  }

  @Query(() => POApprover)
  po_approver(@Args('id') id: string) {
    return this.poApproverService.findOne(id);
  }

  @Mutation(() => POApprover)
  updatePoApprover(
    @Args('id') id: string,
    @Args('input') updatePoApproverInput: UpdatePoApproverInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.poApproverService.setAuthUser(authUser)
    return this.poApproverService.update(id, updatePoApproverInput);
  }

  @Mutation(() => UpdatePoOrderResponse)
  async updatePOApproverOrder(
    @Args('inputs', { type: () => [UpdatePoOrderInput] }) inputs: UpdatePoOrderInput[],
    @CurrentAuthUser() authUser: AuthUser
  ) {

    if (!isAdmin(authUser)) {
      throw new ForbiddenException('Only Admin can update PO Approver Order')
    }

    return await this.poApproverService.updateManyOrders(inputs);

  }

  @Mutation(() => WarehouseRemoveResponse)
  removePoApprover(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {

    if (!isAdmin(authUser)) {
      throw new ForbiddenException('Only Admin can remove PO Approver')
    }

    this.poApproverService.setAuthUser(authUser)
    return this.poApproverService.remove(id);
  }

  @ResolveField(() => Employee)
  approver(@Parent() poApprover: POApprover): any {
    return { __typename: 'Employee', id: poApprover.approver_id }
  }

}
