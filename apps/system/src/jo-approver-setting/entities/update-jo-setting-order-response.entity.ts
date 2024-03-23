import { Field, ObjectType } from "@nestjs/graphql";
import { JoApproverSetting as J } from "./jo-approver-setting.entity";
import { JOApproverSetting } from "apps/system/prisma/generated/client";

@ObjectType()
export class UpdateJoSettingOrderResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => [J])
  approvers: JOApproverSetting[];
}