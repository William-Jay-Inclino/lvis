import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Canvass } from '../../canvass/entities/canvass.entity';
import { MEQS } from '../../meqs/entities/meq.entity';
import { JOApprover } from '../../jo-approver/entities/jo-approver.entity';

@ObjectType()
export class JO {

  @Field(() => ID)
  id: string;

  @Field(() => String)
  jo_number: string;

  @Field(() => String)
  date_requested: string;

  @Field(() => String)
  canvass_id: string;

  @Field(() => String)
  equipment: string;

  @Field(() => String, { nullable: true })
  classification_id: string | null;

  @Field(() => String)
  department_id: string;

  @Field(() => String)
  supervisor_id: string;

  @Field(() => String)
  notes: string;



  // =============== audit fields ===============

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

  @Field(() => [JOApprover])
  jo_approvers: JOApprover[]


}
