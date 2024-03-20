import { Field, ObjectType } from "@nestjs/graphql";
import { JOApprover as J } from "./jo-approver.entity";
import { JOApprover } from "apps/warehouse/prisma/generated/client";

@ObjectType()
export class UpdateJOOrderResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => [J])
  approvers: JOApprover[];
}