import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { ITEM_TRANSACTION_TYPE } from '../../__common__/types';
import { Item } from '../../item/entities/item.entity';

@ObjectType()
export class ItemTransaction {

  @Field(() => ID)
  id: string;

  @Field()
  item_id: string;

  @Field({ nullable: true })
  rr_item_id?: string | null;

  @Field(() => Int)
  type: ITEM_TRANSACTION_TYPE;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;

  @Field({ nullable: true })
  remarks?: string | null;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Item)
  item: Item;


  // @Field(() => Item)
  // rr_item: Item;

}
