import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PoNumber {
  @Field(() => String)
  po_number: string;
}