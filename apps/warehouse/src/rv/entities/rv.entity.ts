import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Canvass } from '../../canvass/entities/canvass.entity';
@ObjectType()
export class RV {
  
  @Field(() => ID)
  id: string;

  @Field(() => String)
  canvass_id: string;

  @Field(() => Canvass)
  canvass: Canvass;

  @Field(() => String, {nullable: true})
  classification_id: string | null;

  @Field(() => String)
  supervisor_id: string;

  @Field(() => String)
  created_by: string;

  @Field(() => String, {nullable: true})
  canceller_id: string | null;

  @Field(() => String)
  rv_number: string;

  @Field(() => String)
  date_requested: string;

  @Field(() => String, {nullable: true})
  work_order_no: string;

  @Field(() => String, {nullable: true})
  work_order_date: string;

  @Field(() => String, {nullable: true})
  notes: string;

  @Field(() => Int)
  status: number

  @Field(() => Boolean)
  is_referenced: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Boolean)
  is_deleted: boolean;
  
}
