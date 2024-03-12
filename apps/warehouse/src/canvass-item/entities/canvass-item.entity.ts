import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Brand } from '../../brand/entities/brand.entity';
import { Unit } from '../../unit/entities/unit.entity';
import { MeqsSupplierItem } from '../../meqs-supplier-item/entities/meqs-supplier-item.entity';
import { Canvass } from '../../canvass/entities/canvass.entity';
import { Item } from '../../item/entities/item.entity';

@ObjectType()
export class CanvassItem {

  @Field(() => ID)
  id: string;

  @Field(() => String)
  canvass_id: string;

  @Field(() => String, { nullable: true })
  brand_id: string | null;

  @Field(() => String, { nullable: true })
  unit_id: string;

  @Field(() => String, { nullable: true })
  item_id: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  quantity: string;

  @Field(() => String)
  created_by: string;

  @Field(() => String, { nullable: true })
  updated_by: string | null;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;


  // =============== derived / resolvers =============== 

  @Field(() => [MeqsSupplierItem])
  meqs_supplier_items: MeqsSupplierItem[]

  @Field(() => Canvass)
  canvass: Canvass;

  @Field(() => Brand, { nullable: true })
  brand: Brand | null;

  @Field(() => Unit, { nullable: true })
  unit: Unit | null;

  @Field(() => Item, { nullable: true })
  item: Item;

}

