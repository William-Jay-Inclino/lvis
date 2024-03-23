import { Field, ObjectType } from "@nestjs/graphql";
import { RvApproverSetting as R } from "./rv-approver-setting.entity";
import { RVApproverSetting } from "apps/system/prisma/generated/client";

@ObjectType()
export class UpdateRvSettingOrderResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => [R])
  approvers: RVApproverSetting[];
}