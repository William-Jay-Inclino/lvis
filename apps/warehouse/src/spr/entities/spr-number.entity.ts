import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SprNumber {
  @Field(() => String)
  spr_number: string;
}