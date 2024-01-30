import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { MeqsApproverService } from './meqs-approver.service';
import { MEQSApprover } from './entities/meqs-approver.entity';
import { CreateMeqsApproverInput } from './dto/create-meqs-approver.input';
import { UpdateMeqsApproverInput } from './dto/update-meqs-approver.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../auth/current-auth-user.decorator';
import { Employee } from '../employee/entities/employee.entity';

@UseGuards(GqlAuthGuard)
@Resolver(() => MEQSApprover)
export class MeqsApproverResolver {
  constructor(private readonly meqsApproverService: MeqsApproverService) {}

  @Mutation(() => MEQSApprover)
  createMeqsApprover(
    @Args('input') createMeqsApproverInput: CreateMeqsApproverInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.meqsApproverService.setAuthUser(authUser)
    return this.meqsApproverService.create(createMeqsApproverInput);
  }

  @Query(() => [MEQSApprover])
  meqsApprovers() {
    return this.meqsApproverService.findAll();
  }

  @Query(() => MEQSApprover)
  meqsApprover(@Args('id') id: string) {
    return this.meqsApproverService.findOne(id);
  }

  @Mutation(() => MEQSApprover)
  updateMeqsApprover(
    @Args('id') id: string,
    @Args('input') updateMeqsApproverInput: UpdateMeqsApproverInput
  ) {
    return this.meqsApproverService.update(id, updateMeqsApproverInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  removeMeqsApprover(@Args('id') id: string) {
    return this.meqsApproverService.remove(id);
  }

  @ResolveField( () => Employee)
  approver(@Parent() meqsApprover: MEQSApprover): any {
    return { __typename: 'Employee', id: meqsApprover.approver_id }
  }

  @ResolveField( () => Employee, { nullable: true })
  approver_proxy(@Parent() meqsApprover: MEQSApprover): any {

    if(!meqsApprover.approver_proxy_id){
      return null
    }
    return { __typename: 'Employee', id: meqsApprover.approver_proxy_id }
  }

}
