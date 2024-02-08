import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { ITEM_CLASS, VAT_TYPE } from '../../__common__/types';

@ObjectType()
export class RrItem {

  @Field(() => ID)
  id: string

  @Field()
  rr_id: string

  @Field({ nullable: true })
  item_id: string | null

  @Field({ nullable: true })
  item_brand_id: string | null

  @Field({ nullable: true })
  unit_id: string | null

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

  @Field(() => Float)
  freight_cost: number

}
