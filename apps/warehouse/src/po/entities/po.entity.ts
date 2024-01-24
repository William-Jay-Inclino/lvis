import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { POApprover } from './po-approver.entity';
import { POItem } from './po-item.entity';
import { MEQS } from '../../meqs/entities/meq.entity';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { APPROVAL_STATUS } from '../../__common__/types';
import { Employee } from 'apps/system/src/employee/entities/employee.entity';

@ObjectType()
export class PO {

  @Field(() => String)
  id: string;

  @Field(() => String)
  meqs_id: string;

  @Field(() => MEQS)
  meqs: MEQS;

  @Field(() => String)
  po_number: string;

  @Field(() => String)
  supplier_id: string;

  @Field(() => Supplier)
  supplier: Supplier;

  @Field(() => String)
  po_date: string;

  @Field(() => String)
  payment_terms: string;

  @Field(() => String)
  purpose: string;

  @Field(() => String, {nullable: true})
  notes: string | null;

  @Field(() => Int)
  status: APPROVAL_STATUS;

  @Field(() => String, {nullable: true})
  canceller_id: string;

  @Field(() => Employee, {nullable: true})
  canceller: Employee;

  @Field(() => [POApprover])
  po_approvers: POApprover[];

  @Field(() => [POItem])
  po_items: POItem[];

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

}
