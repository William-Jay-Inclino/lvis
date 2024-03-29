import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Role } from 'apps/system/prisma/generated/client';
import { UserStatus } from '../../__common__/types';
import { UserEmployee } from './user-employee.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {

  @Field()
  id: string;

  @Field({ nullable: true })
  employee_id?: string | null;

  @Field()
  username: string;

  @Field({ nullable: true })
  password: string;

  @Field()
  firstname: string;

  @Field({ nullable: true })
  middlename: string;

  @Field()
  lastname: string;

  @Field(() => Int)
  status: UserStatus;

  @Field(() => Role)
  role: Role;

  @Field({ nullable: true })
  permissions?: string



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
