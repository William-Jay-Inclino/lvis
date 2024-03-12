import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { VAT_TYPE } from '../../__common__/types';
import { MeqsSupplier } from '../../meqs-supplier/entities/meqs-supplier.entity';
import { CanvassItem } from '../../canvass-item/entities/canvass-item.entity';

@ObjectType()
export class MeqsSupplierItem {

  @Field(() => ID)
  id: string;

  @Field(() => String)
  meqs_supplier_id: string;

  @Field(() => MeqsSupplier)
  meqs_supplier: MeqsSupplier;

  @Field(() => String)
  canvass_item_id: string;

  @Field(() => CanvassItem)
  canvass_item: CanvassItem;

  @Field(() => Float)
  price: number;

  @Field(() => String, { nullable: true })
  notes?: string | null;

  @Field(() => Boolean)
  is_awarded: boolean;

  @Field(() => Int)
  vat_type: VAT_TYPE;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => String)
  created_by: string;
}
