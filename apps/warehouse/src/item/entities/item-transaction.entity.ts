import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Unit } from '../../unit/entities/unit.entity';
import { ITEM_TRANSACTION_TYPE } from '../../__common__/types';

@ObjectType()
export class ItemTransaction {

  @Field(() => ID)
  id: string;

  @Field()
  item_id: string;

  @Field({ nullable: true })
  rr_item_id: string;

  @Field(() => Int)
  type: ITEM_TRANSACTION_TYPE;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;

  @Field({ nullable: true })
  remarks?: string | null;

  @Field(() => Boolean)
  is_initial: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}
