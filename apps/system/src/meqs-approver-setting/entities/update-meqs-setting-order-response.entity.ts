import { Field, ObjectType } from "@nestjs/graphql";
import { MeqsApproverSetting as M } from "./meqs-approver-setting.entity";
import { MEQSApproverSetting } from "apps/system/prisma/generated/client";

@ObjectType()
export class UpdateMeqsSettingOrderResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => [M])
  approvers: MEQSApproverSetting[];
}