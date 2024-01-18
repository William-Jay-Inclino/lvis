import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateEmployeeInput {

  @Field(() => String)
  @IsNotEmpty()
  employee_number: string;

  @Field(() => String)
  @IsNotEmpty()
  department_id: string;

  @Field(() => String)
  @IsNotEmpty()
  firstname: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  middlename?: string;

  @Field(() => String)
  @IsNotEmpty()
  lastname: string;

}
