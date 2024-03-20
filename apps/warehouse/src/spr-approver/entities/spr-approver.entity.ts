import { Field, Int, ObjectType } from "@nestjs/graphql";
import { APPROVAL_STATUS } from "../../__common__/types";
import { SPR } from "../../spr/entities/spr.entity";


@ObjectType()
export class SPRApprover {

  @Field(() => String)
  id: string;

  @Field(() => String)
  spr_id: string

  @Field(() => String)
  approver_id: string

  @Field(() => String, { nullable: true })
  date_approval: string | null

  @Field(() => String, { nullable: true })
  notes: string

  @Field(() => Int)
  status: APPROVAL_STATUS

  @Field(() => String)
  label: string

  @Field(() => Int)
  order: number


  // =============== audit fields =============== 

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

  @Field(() => SPR)
  spr: SPR

}