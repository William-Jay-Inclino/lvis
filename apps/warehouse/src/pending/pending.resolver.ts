import { Resolver, Query, Args } from '@nestjs/graphql';
import { PendingService } from './pending.service';
import { Pending } from './entities/pending.entity';

@Resolver(() => Pending)
export class PendingResolver {
  constructor(private readonly pendingService: PendingService) {}

  @Query(() => [Pending])
  pendings_by_approver_id(@Args('approver_id') approver_id: string,) {
    return this.pendingService.findPendingsByApproverId(approver_id);
  }
  
}
