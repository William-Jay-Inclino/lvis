import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RvNumber {
  @Field(() => String)
  rv_number: string;
}