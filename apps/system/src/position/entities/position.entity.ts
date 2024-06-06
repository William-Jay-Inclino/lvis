import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Position {

  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  permissions?: string

}
