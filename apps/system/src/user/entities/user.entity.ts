import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {

  @Field()
  id: string;

  @Field()
  username: string;

  @Field({nullable: true})
  password: string;

  @Field(() => Int)
  status: number;
}
