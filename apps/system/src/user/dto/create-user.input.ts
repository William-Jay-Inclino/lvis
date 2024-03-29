import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Role } from 'apps/system/prisma/generated/client';
import { IsJSON, IsNotEmpty, IsOptional, IsString } from 'class-validator';

registerEnumType(Role, {
  name: 'Role',
  description: 'Role of the User default is User',
});

@InputType()
export class CreateUserInput {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  employee_id?: string | null;

  @Field()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  middlename?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @Field(type => Role, { nullable: true })
  @IsOptional()
  role?: Role | null

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @IsJSON()
  permissions?: string;

}
