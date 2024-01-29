import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RvApproverService } from './rv-approver.service';
import { RVApprover } from './entities/rv-approver.entity';
import { CreateRvApproverInput } from './dto/create-rv-approver.input';
import { UpdateRvApproverInput } from './dto/update-rv-approver.input';

@Resolver(() => RVApprover)
export class RvApproverResolver {
  constructor(private readonly rvApproverService: RvApproverService) {}

  @Mutation(() => RVApprover)
  createRvApprover(@Args('createRvApproverInput') createRvApproverInput: CreateRvApproverInput) {
    return this.rvApproverService.create(createRvApproverInput);
  }

  @Query(() => [RVApprover], { name: 'rvApprover' })
  findAll() {
    return this.rvApproverService.findAll();
  }

  @Query(() => RVApprover, { name: 'rvApprover' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rvApproverService.findOne(id);
  }

  @Mutation(() => RVApprover)
  updateRvApprover(@Args('updateRvApproverInput') updateRvApproverInput: UpdateRvApproverInput) {
    return this.rvApproverService.update(updateRvApproverInput.id, updateRvApproverInput);
  }

  @Mutation(() => RVApprover)
  removeRvApprover(@Args('id', { type: () => Int }) id: number) {
    return this.rvApproverService.remove(id);
  }
}
