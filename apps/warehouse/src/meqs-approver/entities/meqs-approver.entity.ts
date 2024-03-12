import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { MEQS } from '../../meqs/entities/meq.entity';
import { APPROVAL_STATUS } from '../../__common__/types';

@ObjectType()
export class MEQSApprover {

  @Field(() => ID)
  id: string;

  @Field(() => String)
  meqs_id: string

  @Field(() => String)
  approver_id: string

  @Field(() => String, { nullable: true })
  date_approval: string | null

  @Field(() => String)
  notes: string

  @Field(() => Int)
  status: APPROVAL_STATUS

  @Field(() => String)
  label: string

  @Field(() => Int)
  order: number

  @Field()
  created_by: string;

  @Field({ nullable: true })
  updated_by: string | null;

  @Field({ nullable: true })
  deleted_by: string | null;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date | null;



  // =============== derived / resolvers =============== 

  @Field(() => MEQS)
  meqs: MEQS

}
