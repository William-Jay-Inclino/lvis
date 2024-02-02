import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Supplier {

  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  contact: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Boolean)
  is_deleted: boolean;

}
