import { ObjectType, Field } from '@nestjs/graphql';
import { CanvassItem } from './canvass-item.entity';
import { Employee } from 'apps/system/src/employee/entities/employee.entity';

@ObjectType()
export class Canvass {

  @Field(() => String)
  id: string;

  @Field(() => String)
  rc_number: string;

  @Field(() => String)
  date_requested: string;

  @Field(() => String)
  purpose: string;

  @Field(() => String)
  notes: string;

  @Field(() => String)
  requested_by_id: string;

  @Field(() => Employee)
  requested_by: Employee;

  @Field(() => String)
  noted_by_id: string;

  @Field(() => Employee)
  noted_by: Employee;

  @Field(() => [CanvassItem])
  canvass_items: CanvassItem[];

  @Field(() => Boolean)
  is_referenced: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}


@ObjectType()
export class RemoveCanvassResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  msg: string;
}

