import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RrNumber {
  @Field(() => String)
  rr_number: string;
}