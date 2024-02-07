import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PO } from '../../po/entities/po.entity';
import { RR } from '../../rr/entities/rr.entity';

@ObjectType()
export class RrApprover {
  
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
  rr_id: string

  @Field(() => RR)
  rr: RR

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

}
