import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateItemInput } from '../../item/dto/create-item.input';
import { CreateRvApproverInput } from './create-rv-approver.input';
import { APPROVAL_STATUS } from 'src/__common__/entities';

@InputType()
export class CreateRvInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  canvass_id: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  supervisor_id: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  classification_id?: string | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  rv_number: string;

  @Field(() => String)
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date_requested: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  work_order_no?: string | null;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  work_order_date?: string | null;

  @Field(() => [CreateItemInput])
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemInput)
  items: CreateItemInput[];

  @Field(() => [CreateRvApproverInput])
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRvApproverInput)
  approvers: CreateRvApproverInput[];

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  purpose: string;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  notes?: string | null;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  status: APPROVAL_STATUS;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  requested_by_id: string;



}
