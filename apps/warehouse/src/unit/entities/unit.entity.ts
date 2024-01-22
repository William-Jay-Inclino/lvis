import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Unit {

  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

}
