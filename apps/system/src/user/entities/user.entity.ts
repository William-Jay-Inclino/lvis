import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Role } from 'apps/system/prisma/generated/client';
import { UserStatus } from '../../__common__/types';
import { UserEmployee } from './user-employee.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {

  @Field()
  id: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  password: string;

  @Field(() => Int)
  status: UserStatus;

  @Field(() => Role)
  role: Role;

  @Field(() => UserEmployee, { nullable: true })
  user_employee: UserEmployee;

}
