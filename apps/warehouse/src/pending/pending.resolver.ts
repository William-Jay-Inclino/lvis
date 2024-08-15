import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { PendingService } from './pending.service';
import { Pending } from './entities/pending.entity';
import { PendingResponse } from './entities/pending-response.entity';
import { APPROVAL_STATUS } from '../__common__/types';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AuthUser } from '../__common__/auth-user.entity';

@UseGuards(GqlAuthGuard)
@Resolver(() => Pending)
export class PendingResolver {
  constructor(private readonly pendingService: PendingService) {}

  @Query(() => [Pending])
  pendings_by_approver_id(@Args('approver_id') approver_id: string,) {
    return this.pendingService.findPendingsByApproverId(approver_id);
  }

  @Mutation(() => PendingResponse)
  approve_pending(
    @CurrentAuthUser() authUser: AuthUser,
    @Args('id', { type: () => Int }) id: number,
    @Args('remarks', { type: () => String }) remarks: string,
    @Args('classification_id', { type: () => String, nullable: true }) classification_id?: string | null,
    @Args('fund_source_id', { type: () => String, nullable: true }) fund_source_id?: string | null,
  ) {
    console.log('approve_pending');

    this.pendingService.setAuthUser(authUser)

    return this.pendingService.approveOrDisapprovePending({
      id,
      status: APPROVAL_STATUS.APPROVED,
      remarks,
      classification_id,
      fund_source_id
    })
  }

  @Mutation(() => PendingResponse)
  disapprove_pending(
    @CurrentAuthUser() authUser: AuthUser,
    @Args('id', { type: () => Int }) id: number,
    @Args('remarks', { type: () => String }) remarks: string,
    @Args('classification_id', { type: () => String, nullable: true }) classification_id?: string | null,
    @Args('fund_source_id', { type: () => String, nullable: true }) fund_source_id?: string | null,
  ) {
    console.log('disapprove_pending');

    this.pendingService.setAuthUser(authUser)
    
    return this.pendingService.approveOrDisapprovePending({
      id,
      status: APPROVAL_STATUS.DISAPPROVED,
      remarks,
      classification_id,
      fund_source_id
    })
  }
  
}
