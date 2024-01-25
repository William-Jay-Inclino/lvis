import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RemoveCanvassResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  msg: string;
}