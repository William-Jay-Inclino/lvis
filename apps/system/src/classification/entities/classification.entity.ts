import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Classification {

  @Field(() => ID)
  id: string;

  @Field()
  name: string;

}
