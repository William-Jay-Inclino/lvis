import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RvApproverService } from './rv-approver.service';
import { RVApprover } from './entities/rv-approver.entity';
import { CreateRvApproverInput } from './dto/create-rv-approver.input';
import { UpdateRvApproverInput } from './dto/update-rv-approver.input';
import { WarehouseRemoveResponse } from '../__common__/classes';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../auth/current-auth-user.decorator';

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
  rvApprovers() {
    return this.rvApproverService.findAll();
  }

  @Query(() => RVApprover)
  rvApprover(@Args('id') id: string) {
    return this.rvApproverService.findOne(id);
  }

  @Mutation(() => RVApprover)
  updateRvApprover(
    @Args('id') id: string,
    @Args('input') updateRvApproverInput: UpdateRvApproverInput
  ) {
    return this.rvApproverService.update(id, updateRvApproverInput);
  }

  @Mutation(() => WarehouseRemoveResponse)
  removeRvApprover(@Args('id') id: string) {
    return this.rvApproverService.remove(id);
  }
}
