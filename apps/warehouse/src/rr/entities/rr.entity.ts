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

  @Field()
  delivery_number: string;

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

}
