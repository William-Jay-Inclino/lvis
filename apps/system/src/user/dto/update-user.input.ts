import { IsJSON, IsOptional, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { Role } from 'apps/system/prisma/generated/client';
import { UserPermissionsInput } from './create-user-permissions.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  password?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  firstname?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  middlename?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  lastname?: string;

  @Field(type => Role, { nullable: true })
  @IsOptional()
  role?: Role | null

  @Field(() => Int, { nullable: true })
  @IsOptional()
  status?: number;

  @Field({ nullable: true })
  @IsOptional()
  permissions?: string;

}
