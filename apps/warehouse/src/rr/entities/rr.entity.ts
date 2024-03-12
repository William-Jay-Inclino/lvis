import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { PO } from '../../po/entities/po.entity';
import { RrItem } from '../../rr-item/entities/rr-item.entity';
import { RrApprover } from '../../rr-approver/entities/rr-approver.entity';

@ObjectType()
export class RR {

  @Field(() => ID)
  id: string;

  @Field()
  po_id: string;

  @Field()
  rr_number: string;

  @Field(() => Date)
  rr_date: Date;

  @Field()
  received_by_id: string;

  @Field()
  invoice_number: string;

  @Field({ nullable: true })
  delivery_number?: string | null;

  @Field()
  notes: string;

  @Field(() => Float)
  delivery_charge: number;

  @Field(() => Boolean)
  is_completed: boolean;

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


  @Field(() => PO)
  po: PO;

  @Field(() => [RrApprover])
  rr_approvers: RrApprover[];

  @Field(() => [RrItem])
  rr_items: RrItem[];


}
