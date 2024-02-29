import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Unit } from '../../unit/entities/unit.entity';
import { ItemTransaction } from '../../item-transaction/entities/item-transaction.entity';
import { ItemType } from '../../item-type/entities/item-type.entity';
import { RrItem } from '../../rr-item/entities/rr-item.entity';

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
  total_quantity: number;

  @Field(() => Int)
  initial_quantity: number;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => ItemType)
  item_type: ItemType;

  @Field(() => [ItemTransaction])
  item_transactions: ItemTransaction[];

  @Field(() => [RrItem])
  rr_items: RrItem[];

  @Field( () => Unit)
  unit: Unit;

}
