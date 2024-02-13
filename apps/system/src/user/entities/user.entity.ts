import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from 'apps/system/prisma/generated/client';
import { UserStatus } from '../../__common__/types';

@ObjectType()
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
