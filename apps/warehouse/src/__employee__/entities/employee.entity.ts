import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { RVApprover } from '../../rv-approver/entities/rv-approver.entity';
import { MEQSApprover } from '../../meqs-approver/entities/meqs-approver.entity';
import { POApprover } from '../../po-approver/entities/po-approver.entity';
import { RrApprover } from '../../rr-approver/entities/rr-approver.entity';
import { PendingApproval } from './pending-approval.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Employee {

  @Field(() => ID)
  id: string;

  // @Field()
  // firstname: string;

  // @Field({ nullable: true })
  // middlename: string | null;

  // @Field()
  // lastname: string;

  // @Field({ nullable: true })
  // position: string | null;

  @Field(() => [RVApprover])
  rv_pending_approvals: RVApprover[]

  @Field(() => [MEQSApprover])
  meqs_pending_approvals: MEQSApprover[]

  @Field(() => [POApprover])
  po_pending_approvals: POApprover[]

  @Field(() => [RrApprover])
  rr_pending_approvals: RrApprover[]

  @Field(() => [PendingApproval])
  pending_approvals: PendingApproval[]

}
