import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateMeqsApproverSubInput } from './create-meqs-approver.sub.input';
import { CreateMeqsSupplierSubInput } from './create-meqs-supplier.sub.input';

@InputType()
export class CreateMeqsInput {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  jo_id: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  rv_id: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  spr_id: string | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  notes: string;

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
