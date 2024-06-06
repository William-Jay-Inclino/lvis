import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateEmployeeInput } from './create-employee.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {

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

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  position_id?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  is_budget_officer?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  is_finance_manager?: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  signature_src?: string;

}
