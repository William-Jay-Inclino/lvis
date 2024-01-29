import { ObjectType, Field, Int } from '@nestjs/graphql';
import { RVApprover } from './rv-approver.entity';
import { Canvass } from '../../canvass/entities/canvass.entity';
import { Employee } from '../../employee/entities/employee.entity';
// import { Employee } from 'apps/system/src/employee/entities/employee.entity';
// import { Classification } from 'apps/system/src/classification/entities/classification.entity';

@ObjectType()
export class RV {
  
  @Field(() => String)
  id: string;

  @Field(() => String)
  canvass_id: string;

  @Field(() => Canvass)
  canvass: Canvass;

  @Field(() => String, {nullable: true})
  classification_id: string | null;

  @Field(() => String)
  supervisor_id: string;

  @Field(() => String, {nullable: true})
  canceller_id: string;

  @Field(() => String)
  rv_number: string;

  @Field(() => String)
  date_requested: string;

  @Field(() => String, {nullable: true})
  work_order_no: string;

  @Field(() => String, {nullable: true})
  work_order_date: string;

  @Field(() => Int)
  status: number

  @Field(() => Boolean)
  is_referenced: boolean;

  @Field(() => [RVApprover])
  rv_approvers: RVApprover[];

  @Field(() => Employee)
  supervisor: Employee;

  // @Field(() => Classification, {nullable: true})
  // classification: Classification | null

  @Field(() => Employee, {nullable: true})
  canceller: Employee;

}
