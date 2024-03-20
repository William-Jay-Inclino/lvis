import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class JoNumber {
    @Field(() => String)
    jo_number: string;
}