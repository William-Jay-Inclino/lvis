import { Field, ObjectType } from "@nestjs/graphql";
import { RrApproverSetting as R } from "./rr-approver-setting.entity";
import { RRApproverSetting } from "apps/system/prisma/generated/client";

@ObjectType()
export class UpdateRrSettingOrderResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => [R])
  approvers: RRApproverSetting[];
}