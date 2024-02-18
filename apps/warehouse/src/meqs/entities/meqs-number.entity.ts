import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MeqsNumber {
  @Field(() => String)
  meqs_number: string;
}