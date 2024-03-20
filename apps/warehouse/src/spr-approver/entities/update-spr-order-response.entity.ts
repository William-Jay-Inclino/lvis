import { Field, ObjectType } from "@nestjs/graphql";
import { SPRApprover as S } from "./spr-approver.entity";
import { SPRApprover } from "apps/warehouse/prisma/generated/client";

@ObjectType()
export class UpdateSPROrderResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => [S])
  approvers: SPRApprover[];
}