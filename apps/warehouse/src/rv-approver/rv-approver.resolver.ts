import { Resolver, Query, Mutation, Args, ResolveField, Parent, Int } from '@nestjs/graphql';
import { RvApproverService } from './rv-approver.service';
import { RVApprover } from './entities/rv-approver.entity';
import { CreateRvApproverInput } from './dto/create-rv-approver.input';
import { UpdateRvApproverInput } from './dto/update-rv-approver.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { Employee } from '../__employee__/entities/employee.entity';
import { RV } from '../rv/entities/rv.entity';
import { UpdateManyOrderResponse } from './entities/update-many-order-response.entity';
import { UpdateOrderInput } from './dto/update-order.input'

@UseGuards(GqlAuthGuard)
@Resolver(() => RVApprover)
export class RvApproverResolver {
  constructor(private readonly rvApproverService: RvApproverService) {}

  @Mutation(() => RVApprover)
  createRvApprover(
    @Args('input') createRvApproverInput: CreateRvApproverInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.rvApproverService.setAuthUser(authUser)
    return this.rvApproverService.create(createRvApproverInput);
  }

  @Query(() => [RVApprover])
  rv_approvers(
    @Args('rv_id', {nullable: true}) rv_id?: string,
    @Args('rv_number', {nullable: true}) rv_number?: string,
  ) {
    if(rv_id){
      return this.rvApproverService.findByRvId(rv_id)
    }
    if(rv_number){
      return this.rvApproverService.findByRvNumber(rv_number)
    }
  }

  @Query(() => RVApprover)
  rv_approver(@Args('id') id: string) {
    return this.rvApproverService.findOne(id);
  }

  @Mutation(() => RVApprover)
  updateRvApprover(
    @Args('id') id: string,
    @Args('input') updateRvApproverInput: UpdateRvApproverInput
  ) {
    return this.rvApproverService.update(id, updateRvApproverInput);
  }

  @Mutation(() => UpdateManyOrderResponse)
  async updateManyRVApproverOrders(@Args('inputs', { type: () => [UpdateOrderInput] }) inputs: UpdateOrderInput[]){

    return await this.rvApproverService.updateManyOrders(inputs);

  }

  @Mutation(() => WarehouseRemoveResponse)
  removeRvApprover(@Args('id') id: string) {
    return this.rvApproverService.remove(id);
  }

  @ResolveField( () => Employee)
  approver(@Parent() rvApprover: RVApprover): any {
    return { __typename: 'Employee', id: rvApprover.approver_id }
  }

  @ResolveField( () => Employee, { nullable: true })
  approver_proxy(@Parent() rvApprover: RVApprover): any {

    if(!rvApprover.approver_proxy_id){
      return null
    }
    return { __typename: 'Employee', id: rvApprover.approver_proxy_id }
  }

}
