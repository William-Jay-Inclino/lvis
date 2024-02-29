import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PO } from '../../po/entities/po.entity';

@ObjectType()
export class POApprover {
  
  @Field(() => String)
  id: string;

  @Field(() => String)
  approver_id: string

  @Field(() => String, { nullable: true })
  approver_proxy_id: string | null

  @Field(() => String, {nullable: true})
  date_approval: string | null
  
  @Field(() => String, {nullable: true})
  notes: string | null

  @Field(() => Int)
  status: number

  @Field(() => String)
  label: string
  
  @Field(() => Int)
  order: number

  @Field(() => String)
  po_id: string

  @Field(() => PO)
  po: PO

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

}
