import { ObjectType, Field } from '@nestjs/graphql';
import { MeqsSupplier } from '../../meqs-supplier/entities/meqs-supplier.entity';
import { RR } from '../../rr/entities/rr.entity';
import { POApprover } from '../../po-approver/entities/po-approver.entity';

@ObjectType()
export class PO {

  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  meqs_supplier_id?: string | null;

  @Field(() => String, { nullable: true })
  fund_source_id: string | null;

  @Field(() => String)
  po_number: string;

  @Field(() => String)
  po_date: string;

  @Field(() => String, { nullable: true })
  notes: string;

  @Field({ nullable: true })
  cancelled_by: string | null;

  @Field()
  created_by: string;

  @Field({ nullable: true })
  updated_by: string | null;

  @Field({ nullable: true })
  cancelled_at: string | null;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;



  // =============== derived / resolvers =============== 


  @Field(() => MeqsSupplier, { nullable: true })
  meqs_supplier?: MeqsSupplier | null

  @Field(() => [RR])
  rrs: RR[];

  @Field(() => [POApprover])
  po_approvers: POApprover[]

}
