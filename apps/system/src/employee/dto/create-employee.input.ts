import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateEmployeeInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  middlename?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  position_id?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  signature_src?: string;

}
