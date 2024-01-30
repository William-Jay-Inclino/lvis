import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MEQSItem } from './meqs-item.entity';
import { JO } from '../../jo/entities/jo.entity';
import { RV } from '../../rv/entities/rv.entity';
import { SPR } from '../../spr/entities/spr.entity';
import { APPROVAL_STATUS, REQUEST_TYPE } from '../../__common__/types';
import { Employee } from 'apps/system/src/employee/entities/employee.entity';
import { PO } from '../../po/entities/po.entity';
import { MEQSApprover } from '../../meqs-approver/entities/meqs-approver.entity';

@ObjectType()
export class MEQS {

  @Field(() => String)
  id: string;

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

  @Field(() => Int)
  status: APPROVAL_STATUS;

  @Field(() => String, {nullable: true})
  canceller_id: string;

  @Field(() => Employee, {nullable: true})
  canceller: Employee;

  @Field(() => [MEQSApprover])
  meqs_approvers: MEQSApprover[];

  @Field(() => [MEQSItem])
  meqs_items: MEQSItem[];

  @Field(() => [PO], {nullable: true})
  pos: PO[];

  @Field(() => Boolean)
  is_referenced: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

}
