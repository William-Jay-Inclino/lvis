import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { PendingService } from './pending.service';
import { Pending } from './entities/pending.entity';
import { PendingResponse } from './entities/pending-response.entity';
import { APPROVAL_STATUS } from '../__common__/types';

@Resolver(() => Pending)
export class PendingResolver {
  constructor(private readonly pendingService: PendingService) {}

  @Query(() => [Pending])
  pendings_by_approver_id(@Args('approver_id') approver_id: string,) {
    return this.pendingService.findPendingsByApproverId(approver_id);
  }

  @Mutation(() => PendingResponse)
  approve_pending(
    @Args('id', { type: () => Int }) id: number,
  ) {
    console.log('approve_pending');
    return this.pendingService.approveOrDisapprovePending(id, APPROVAL_STATUS.APPROVED)
  }

  @Mutation(() => PendingResponse)
  disapprove_pending(
    @Args('id', { type: () => Int }) id: number,
  ) {
    console.log('disapprove_pending');
    return this.pendingService.approveOrDisapprovePending(id, APPROVAL_STATUS.DISAPPROVED)
  }
  
}
