import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Unit } from '../../unit/entities/unit.entity';
import { ItemTransaction } from '../../item-transaction/entities/item-transaction.entity';
import { ItemType } from '../../item-type/entities/item-type.entity';

@ObjectType()
export class Item {

  @Field(() => ID)
  id: string;

  @Field()
  item_type_id: string;

  @Field()
  unit_id: string;

  @Field()
  code: string;

  @Field()
  description: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Int)
  initial_quantity: number;

  @Field(() => Float)
  average_price: number;

  @Field(() => Float)
  initial_average_price: number;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => ItemType)
  item_type: ItemType;

  @Field(() => [ItemTransaction])
  item_transactions: ItemTransaction[];

  // @Field()
  // rr_items: string;

  @Field( () => Unit)
  unit: Unit;

}
