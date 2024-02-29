import { Field, ObjectType } from "@nestjs/graphql";
import { POApprover as P } from "./po-approver.entity";
import { POApprover } from "apps/warehouse/prisma/generated/client";

@ObjectType()
export class UpdatePoOrderResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => [P])
  approvers: POApprover[];
}