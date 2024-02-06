import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ItemType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}
