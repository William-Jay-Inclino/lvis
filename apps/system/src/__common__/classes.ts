import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Employee } from "../employee/entities/employee.entity";

@ObjectType()
export class SystemRemoveResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  msg: string;
}


@ObjectType()
export class ApproverSetting {

  @Field(() => ID)
  id: string;

  @Field(() => String)
  approver_id: string;

  @Field(() => Employee)
  approver: Employee;

  @Field(() => String)
  label: string;

  @Field(() => Int)
  order: number;

}


@ObjectType()
export class ApproverSettingRemoveResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  msg: string;

  @Field(() => [ApproverSetting])
  approvers: ApproverSetting[];
}