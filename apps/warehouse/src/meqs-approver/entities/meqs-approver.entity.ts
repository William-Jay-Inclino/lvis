import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MEQS } from '../../meqs/entities/meq.entity';

@ObjectType()
export class MEQSApprover {

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

  // @Field(() => String)
  // meqs_id: string

  // @Field(() => MEQS)
  // meqs: MEQS

}
