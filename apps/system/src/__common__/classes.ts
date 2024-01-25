import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RemoveDataResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  msg: string;
}