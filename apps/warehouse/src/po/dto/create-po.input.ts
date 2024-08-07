import { InputType, Field } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreatePoApproverSubInput } from './create-po-approver.sub.input';

@InputType()
export class CreatePoInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  meqs_supplier_id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  fund_source_id?: string | null;

  @Field(() => [CreatePoApproverSubInput])
  @IsNotEmpty({ each: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePoApproverSubInput)
  approvers: CreatePoApproverSubInput[];

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  notes: string;

}
