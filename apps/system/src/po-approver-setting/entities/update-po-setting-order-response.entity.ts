import { Field, ObjectType } from "@nestjs/graphql";
import { PoApproverSetting as P } from "./po-approver-setting.entity";
import { POApproverSetting } from "apps/system/prisma/generated/client";

@ObjectType()
export class UpdatePoSettingOrderResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => [P])
  approvers: POApproverSetting[];
}