import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UpdateManyOrderResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  msg: string;
}