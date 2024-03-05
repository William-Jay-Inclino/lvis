import { Field, ObjectType } from "@nestjs/graphql";
import { RrApprover as R } from "./rr-approver.entity";
import { RRApprover } from "apps/warehouse/prisma/generated/client";

@ObjectType()
export class UpdateRrOrderResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => [R])
  approvers: RRApprover[];
}