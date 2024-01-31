import { ObjectType, Field, ID } from '@nestjs/graphql';
import { MEQS } from '../../meqs/entities/meq.entity';
import { Supplier } from '../../supplier/entities/supplier.entity';

@ObjectType()
export class MeqsSupplier {

  @Field(() => ID)
  id: string;

  @Field(() => String)
  meqs_id: string;

  // @Field(() => MEQS)
  // meqs: MEQS;

  @Field(() => String)
  supplier_id: string;

  @Field(() => Supplier)
  supplier: Supplier;

  @Field(() => String)
  payment_terms: string;

  @Field(() => Boolean)
  is_referenced: boolean;

}
