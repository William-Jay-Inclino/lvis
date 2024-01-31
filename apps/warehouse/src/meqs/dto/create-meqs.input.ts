import { InputType, Field, Int } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateMeqsApproverInput } from './create-meqs-approver.input';
import { REQUEST_TYPE } from '../../__common__/types'
import { CreateMeqsSupplierInput } from './create-meqs-supplier.input';

@InputType()
export class CreateMeqsInput {

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  jo_id: string | null;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  rv_id: string | null;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  spr_id: string | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  meqs_number: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  request_type: REQUEST_TYPE;

  @Field(() => String)
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  meqs_date: string;

  @Field(() => [CreateMeqsApproverInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMeqsApproverInput)
  approvers: CreateMeqsApproverInput[];

  @Field(() => [CreateMeqsSupplierInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMeqsSupplierInput)
  meqs_suppliers: CreateMeqsSupplierInput[];

}
