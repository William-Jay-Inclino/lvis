import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SystemRemoveResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  msg: string;
}