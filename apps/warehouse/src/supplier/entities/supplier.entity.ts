import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { VAT_TYPE } from '../../__common__/types';

@ObjectType()
export class Supplier {

  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  contact: string;
  
  @Field(() =>Int)
  vat_type: VAT_TYPE;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Boolean)
  is_deleted: boolean;

}
