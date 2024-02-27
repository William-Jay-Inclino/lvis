import { Field, ObjectType } from "@nestjs/graphql";
import { MEQSApprover as M } from "./meqs-approver.entity";
import { MEQSApprover } from "apps/warehouse/prisma/generated/client";

@ObjectType()
export class UpdateMeqsOrderResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => [M])
  approvers: MEQSApprover[];
}