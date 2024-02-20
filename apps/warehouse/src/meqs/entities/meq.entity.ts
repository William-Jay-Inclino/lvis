import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { JO } from '../../jo/entities/jo.entity';
import { RV } from '../../rv/entities/rv.entity';
import { SPR } from '../../spr/entities/spr.entity';
import { APPROVAL_STATUS, REQUEST_TYPE } from '../../__common__/types';
import { MEQSApprover } from '../../meqs-approver/entities/meqs-approver.entity';
import { MeqsSupplier } from '../../meqs-supplier/entities/meqs-supplier.entity';

@ObjectType()
export class MEQS {

  @Field(() => ID)
  id: string;

  @Field()
  created_by_id: string;

  @Field(() => String, {nullable: true})
  jo_id: string | null;

  @Field(() => JO, {nullable: true})
  jo: JO | null;

  @Field(() => String, {nullable: true})
  rv_id: string | null;

  @Field(() => RV, {nullable: true})
  rv: RV | null;

  @Field(() => String, {nullable: true})
  spr_id: string | null;

  @Field(() => SPR, {nullable: true})
  spr: SPR | null;

  @Field(() => String)
  meqs_number: string;

  @Field(() => Int)
  request_type: REQUEST_TYPE;

  @Field(() => String)
  meqs_date: string;

  @Field(() => String)
  notes: string;

  @Field(() => Int)
  status: APPROVAL_STATUS;

  @Field(() => String, {nullable: true})
  canceller_id: string;

  @Field(() => [MEQSApprover])
  meqs_approvers: MEQSApprover[];

  @Field(() => [MeqsSupplier])
  meqs_suppliers: MeqsSupplier[];

  // @Field(() => [PO])
  // pos: PO[];

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

}
