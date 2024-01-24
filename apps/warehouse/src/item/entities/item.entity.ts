import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SupplierItem } from './supplier-item.entity';
import { Brand } from '../../brand/entities/brand.entity';
import { Unit } from '../../unit/entities/unit.entity';

@ObjectType()
export class Item {

  @Field(() => String)
  id: string;

  @Field(() => String)
  description: string;

  @Field(() => String, {nullable: true})
  brand_id: string | null;

  @Field(() => Brand, {nullable: true})
  brand: Brand | null;

  @Field(() => String)
  unit_id: string;

  @Field(() => Unit)
  unit: Unit;

  @Field(() => Int)
  quantity: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => [SupplierItem], {nullable: true})
  supplier_items?: SupplierItem[];

}

