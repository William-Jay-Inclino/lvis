import { Field, ObjectType } from "@nestjs/graphql";
import { RVApprover as R } from "./rv-approver.entity";
import { RVApprover } from "apps/warehouse/prisma/generated/client";

@ObjectType()
export class UpdateManyOrderResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => [R])
  approvers: RVApprover[];
}