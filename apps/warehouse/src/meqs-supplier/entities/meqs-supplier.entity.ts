import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { MeqsSupplierItem } from '../../meqs-supplier-item/entities/meqs-supplier-item.entity';
import { MeqsSupplierAttachment } from '../../meqs-supplier-attachment/entities/meqs-supplier-attachment.entity';
import { MEQS } from '../../meqs/entities/meq.entity';
import { VAT_TYPE } from '../../__common__/types';
import { PO } from '../../po/entities/po.entity';

@ObjectType()
export class MeqsSupplier {

  @Field(() => ID)
  id: string;

  @Field(() => String)
  meqs_id: string;

  @Field(() => MEQS)
  meqs: MEQS;

  @Field(() => PO, { nullable: true })
  po: PO;

  @Field(() => String)
  supplier_id: string;

  @Field(() => Supplier)
  supplier: Supplier;

  @Field(() => String)
  payment_terms: string;

  @Field(() => Boolean)
  is_referenced: boolean;

  @Field(() => [MeqsSupplierItem])
  meqs_supplier_items: MeqsSupplierItem[];

  @Field(() => [MeqsSupplierAttachment])
  attachments: MeqsSupplierAttachment[];

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

}
