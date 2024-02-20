import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { PO } from '../../po/entities/po.entity';

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
  canceller_id: string;

  @Field(() => Date)
  date_cancelled: Date;

  @Field()
  invoice_number: string;

  @Field({ nullable: true })
  delivery_number?: string | null;

  @Field()
  notes: string;

  @Field(() => Float)
  delivery_charge: number;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => PO)
  po: PO;

  // @Field()
  // rr_approvers: string;

  // @Field()
  // rr_items: string;

  @Field()
  created_by: string;

  @Field({ nullable: true })
  updated_by: string | null;

  @Field({ nullable: true })
  deleted_by: string | null;

}
