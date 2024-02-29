import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { VAT_TYPE } from '../../__common__/types';

@ObjectType()
export class Station {

  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  address: string;
  
  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Boolean)
  is_deleted: boolean;

}
