import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Role } from 'apps/system/prisma/generated/client';
import { UserStatus } from '../../__common__/types';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {

  @Field()
  id: string;

  @Field()
  username: string;

  @Field({nullable: true})
  password: string;

  @Field(() => Int)
  status: UserStatus;

  @Field(() => Role)
  role: Role;

}
