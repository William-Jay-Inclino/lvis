import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Item } from './item.entity';
import { Supplier } from '../../supplier/entities/supplier.entity';

@ObjectType()
export class SupplierItem {

  @Field(() => String)
  id: string;

  @Field(() => String)
  item_id: string;

  @Field(() => Item)
  item: Item;

  @Field(() => String)
  supplier_id: string;

  @Field(() => Supplier)
  supplier: Supplier;

  @Field(() => Float)
  price: number;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

}

