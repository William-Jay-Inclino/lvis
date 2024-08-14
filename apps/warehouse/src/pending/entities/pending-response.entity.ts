import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class PendingResponse {

  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  msg: string;
}