import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Canvass } from '../../canvass/entities/canvass.entity';
import { MEQS } from '../../meqs/entities/meq.entity';
import { RVApprover } from '../../rv-approver/entities/rv-approver.entity';
@ObjectType()
export class RV {

  @Field(() => ID)
  id: string;

  @Field(() => String)
  rv_number: string;

  @Field(() => String)
  canvass_id: string;

  @Field(() => String, { nullable: true })
  classification_id: string | null;

  @Field(() => String)
  supervisor_id: string;

  @Field(() => String)
  date_requested: string;

  @Field(() => String, { nullable: true })
  work_order_no: string;

  @Field(() => String, { nullable: true })
  work_order_date: string;

  @Field(() => Date, { nullable: true })
  date_cancelled: Date | null;

  @Field(() => String)
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

  @Field(() => Canvass)
  canvass: Canvass;

  @Field(() => MEQS, { nullable: true })
  meqs?: MEQS;

  @Field(() => [RVApprover])
  rv_approvers: RVApprover[]



}
