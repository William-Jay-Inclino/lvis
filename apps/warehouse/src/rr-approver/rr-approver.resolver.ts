import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RrApproverService } from './rr-approver.service';
import { RrApprover } from './entities/rr-approver.entity';
import { CreateRrApproverInput } from './dto/create-rr-approver.input';
import { UpdateRrApproverInput } from './dto/update-rr-approver.input';

@Resolver(() => RrApprover)
export class RrApproverResolver {
  constructor(private readonly rrApproverService: RrApproverService) {}

  @Mutation(() => RrApprover)
  createRrApprover(@Args('input') createRrApproverInput: CreateRrApproverInput) {
    return this.rrApproverService.create(createRrApproverInput);
  }

  @Query(() => [RrApprover])
  rr_approvers() {
    return this.rrApproverService.findAll();
  }

  @Query(() => RrApprover)
  rr_approver(@Args('id') id: string) {
    return this.rrApproverService.findOne(id);
  }

  @Mutation(() => RrApprover)
  updateRrApprover(
    @Args('id') id: string,
    @Args('input') updateRrApproverInput: UpdateRrApproverInput
  ) {
    return this.rrApproverService.update(id, updateRrApproverInput);
  }

  @Mutation(() => RrApprover)
  removeRrApprover(@Args('id') id: string) {
    return this.rrApproverService.remove(id);
  }
}
