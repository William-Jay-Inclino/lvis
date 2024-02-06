import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Unit } from '../../unit/entities/unit.entity';

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

  // @Field()
  // item_type: string;

  // @Field()
  // item_transactions: string;

  // @Field()
  // rr_items: string;

  @Field( () => Unit)
  unit: Unit;

}
