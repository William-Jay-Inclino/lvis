import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class WarehouseRemoveResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  msg: string;
}