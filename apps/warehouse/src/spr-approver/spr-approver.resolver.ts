import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { SprApproverService } from './spr-approver.service';
import { SPRApprover } from './entities/spr-approver.entity';
import { CreateSprApproverInput } from './dto/create-spr-approver.input';
import { UpdateSprApproverInput } from './dto/update-spr-approver.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { Employee } from '../__employee__/entities/employee.entity';
import { UpdateSPROrderResponse } from './entities/update-spr-order-response.entity';
import { UpdateSPROrderInput } from './dto/update-spr-order.input'
import { isAdmin } from '../__common__/helpers';

@UseGuards(GqlAuthGuard)
@Resolver(() => SPRApprover)
export class SprApproverResolver {
  constructor(private readonly sprApproverService: SprApproverService) { }

  @Mutation(() => SPRApprover)
  createSprApprover(
    @Args('input') createSprApproverInput: CreateSprApproverInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {

    if (!isAdmin(authUser)) {
      throw new ForbiddenException('Only Admin can create SPR Approver')
    }

    this.sprApproverService.setAuthUser(authUser)
    return this.sprApproverService.create(createSprApproverInput);
  }

  @Query(() => [SPRApprover])
  spr_approvers(
    @Args('spr_id', { nullable: true }) spr_id?: string,
    @Args('spr_number', { nullable: true }) spr_number?: string,
  ) {
    if (spr_id) {
      return this.sprApproverService.findBySprId(spr_id)
    }
    if (spr_number) {
      return this.sprApproverService.findBySprNumber(spr_number)
    }
  }

  @Query(() => SPRApprover)
  spr_approver(@Args('id') id: string) {
    return this.sprApproverService.findOne(id);
  }

  @Mutation(() => SPRApprover)
  updateSprApprover(
    @Args('id') id: string,
    @Args('input') updateSprApproverInput: UpdateSprApproverInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {

    if (!isAdmin(authUser)) {
      throw new ForbiddenException('Only Admin can update SPR Approver')
    }

    this.sprApproverService.setAuthUser(authUser)
    return this.sprApproverService.update(id, updateSprApproverInput);
  }

  @Mutation(() => UpdateSPROrderResponse)
  async updateSPRApproverOrder(
    @Args('inputs', { type: () => [UpdateSPROrderInput] }) inputs: UpdateSPROrderInput[],
    @CurrentAuthUser() authUser: AuthUser
  ) {

    if (!isAdmin(authUser)) {
      throw new ForbiddenException('Only Admin can update SPR Approver Order')
    }

    return await this.sprApproverService.updateManyOrders(inputs);

  }

  @Mutation(() => WarehouseRemoveResponse)
  removeSprApprover(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {

    if (!isAdmin(authUser)) {
      throw new ForbiddenException('Only Admin can remove SPR Approver')
    }

    this.sprApproverService.setAuthUser(authUser)
    return this.sprApproverService.remove(id);
  }

  @ResolveField(() => Employee)
  approver(@Parent() sprApprover: SPRApprover): any {
    return { __typename: 'Employee', id: sprApprover.approver_id }
  }

}
