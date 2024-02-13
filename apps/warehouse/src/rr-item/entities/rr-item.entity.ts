import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { ITEM_CLASS, VAT_TYPE } from '../../__common__/types';
import { RR } from '../../rr/entities/rr.entity';
import { Item } from '../../item/entities/item.entity';
import { Brand } from '../../brand/entities/brand.entity';
import { Unit } from '../../unit/entities/unit.entity';

@ObjectType()
export class RrItem {

  @Field(() => ID)
  id: string

  @Field()
  rr_id: string

  @Field(() => RR)
  rr: RR

  @Field({ nullable: true })
  item_id: string | null

  @Field(() => Item)
  item: Item

  @Field({ nullable: true })
  item_brand_id: string | null

  @Field(() => Brand)
  item_brand: Brand

  @Field({ nullable: true })
  unit_id: string | null

  @Field(() => Unit)
  unit: Unit

  @Field(() => Int)
  item_class: ITEM_CLASS

  @Field(() => Int)
  quantity_delivered: number

  @Field(() => Int)
  quantity_accepted: number

  @Field()
  description: string

  @Field(() => Int)
  vat_type: VAT_TYPE

  @Field(() => Float)
  gross_price: number

  @Field(() => Float)
  net_price: number

}
