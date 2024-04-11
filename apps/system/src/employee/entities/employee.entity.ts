import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { UserEmployee } from '../../user/entities/user-employee.entity';

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

  @Field(() => String, { nullable: true })
  position: string | null;

  @Field(() => Boolean)
  is_budget_officer: boolean;

  @Field(() => Boolean)
  is_finance_manager: boolean;



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

}
