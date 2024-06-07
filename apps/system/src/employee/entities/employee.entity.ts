import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { UserEmployee } from '../../user/entities/user-employee.entity';
import { Position } from '../../position/entities/position.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Employee {

  @Field(() => ID)
  id: string;

  @Field(() => String)
  firstname: string;

  @Field(() => String, { nullable: true })
  middlename?: string | null;

  @Field(() => String)
  lastname: string;

  @Field(() => String)
  position_id: string;

  @Field(() => Boolean)
  is_budget_officer: boolean;

  @Field(() => Boolean)
  is_finance_manager: boolean;

  @Field(() => String, { nullable: true })
  signature_src?: string | null;

  // =============== audit fields =============== 

  @Field()
  created_by: string;

  @Field({ nullable: true })
  updated_by: string | null;

  @Field({ nullable: true })
  deleted_by: string | null;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date | null;



  // =============== derived / resolvers =============== 

  @Field(() => UserEmployee, { nullable: true })
  user_employee?: UserEmployee;

  @Field(() => Position)
  position: Position;
}
