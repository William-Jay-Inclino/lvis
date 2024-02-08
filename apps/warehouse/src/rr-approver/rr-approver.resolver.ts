import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RrApproverService } from './rr-approver.service';
import { RrApprover } from './entities/rr-approver.entity';
import { CreateRrApproverInput } from './dto/create-rr-approver.input';
import { UpdateRrApproverInput } from './dto/update-rr-approver.input';

@Resolver(() => RrApprover)
export class RrApproverResolver {
  constructor(private readonly rrApproverService: RrApproverService) {}

  @Mutation(() => RrApprover)
  createRrApprover(@Args('createRrApproverInput') createRrApproverInput: CreateRrApproverInput) {
    return this.rrApproverService.create(createRrApproverInput);
  }

  @Query(() => [RrApprover], { name: 'rrApprover' })
  findAll() {
    return this.rrApproverService.findAll();
  }

  @Query(() => RrApprover, { name: 'rrApprover' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rrApproverService.findOne(id);
  }

  @Mutation(() => RrApprover)
  updateRrApprover(@Args('updateRrApproverInput') updateRrApproverInput: UpdateRrApproverInput) {
    return this.rrApproverService.update(updateRrApproverInput.id, updateRrApproverInput);
  }

  @Mutation(() => RrApprover)
  removeRrApprover(@Args('id', { type: () => Int }) id: number) {
    return this.rrApproverService.remove(id);
  }
}
