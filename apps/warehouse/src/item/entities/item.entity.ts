import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Unit } from '../../unit/entities/unit.entity';
import { ItemType } from '../../item-type/entities/item-type.entity';
import { ItemTransaction } from './item-transaction.entity';

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
  name: string;

  @Field({ nullable: true })
  description: string | null;

  @Field(() => Int)
  total_quantity: number;

  @Field(() => Int)
  initial_quantity: number;

  @Field(() => Int)
  alert_level: number;

  @Field()
  created_by: string;

  @Field({ nullable: true })
  updated_by: string | null;

  @Field({ nullable: true })
  deleted_by: string | null;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date | null;



  // =============== derived / resolvers =============== 


  @Field(() => ItemType)
  item_type: ItemType;

  @Field(() => [ItemTransaction])
  item_transactions: ItemTransaction[];

  @Field(() => Unit)
  unit: Unit;

  // @Field(() => [CanvassItem])
  // canvass_items: CanvassItem[];

}
