import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

registerEnumType(Role, {
  name: 'Role',
  description: 'Role of the User default is User',
});

@InputType()
export class CreateUserInput {

  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  password: string; 

  @Field(type => Role, {nullable: true})
  @IsOptional()
  role?: Role | null
}
