import { Field, ObjectType } from "@nestjs/graphql";
import { SprApproverSetting as S } from "./spr-approver-setting.entity";
import { SPRApproverSetting } from "apps/system/prisma/generated/client";

@ObjectType()
export class UpdateSprSettingOrderResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => [S])
  approvers: SPRApproverSetting[];
}