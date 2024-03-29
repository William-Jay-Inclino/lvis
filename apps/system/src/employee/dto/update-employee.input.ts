import { IsOptional, IsString } from 'class-validator';
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

}
