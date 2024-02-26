import { InputType, Field, Int } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateMeqsApproverSubInput } from './create-meqs-approver.sub.input';
import { REQUEST_TYPE } from '../../__common__/types'
import { CreateMeqsSupplierSubInput } from './create-meqs-supplier.sub.input';

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
  notes: string;

  @Field(() => String)
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  meqs_date: string;

  @Field(() => [CreateMeqsApproverSubInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMeqsApproverSubInput)
  approvers: CreateMeqsApproverSubInput[];

  @Field(() => [CreateMeqsSupplierSubInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMeqsSupplierSubInput)
  meqs_suppliers: CreateMeqsSupplierSubInput[];

}
