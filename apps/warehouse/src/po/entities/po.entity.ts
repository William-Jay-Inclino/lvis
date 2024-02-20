import { ObjectType, Field, Int } from '@nestjs/graphql';
import { APPROVAL_STATUS } from '../../__common__/types';
import { MeqsSupplier } from '../../meqs-supplier/entities/meqs-supplier.entity';

@ObjectType()
export class PO {

  @Field(() => String)
  id: string;

  @Field(() => String)
  meqs_supplier_id: string;

  @Field(() => String)
  po_number: string;

  @Field(() => String)
  po_date: string;

  @Field(() => Int)
  status: APPROVAL_STATUS;

  @Field(() => String, {nullable: true})
  canceller_id: string;
  

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => MeqsSupplier)
  meqs_supplier: MeqsSupplier

  @Field()
  created_by: string;

  @Field({ nullable: true })
  updated_by: string | null;

  @Field({ nullable: true })
  deleted_by: string | null;

}
