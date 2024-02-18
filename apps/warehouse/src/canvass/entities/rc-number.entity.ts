import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RcNumber {
  @Field(() => String)
  rc_number: string;
}