import { InputType, Field } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreatePoApproverSubInput } from './create-po-approver.sub.input';

@InputType()
export class CreatePoInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  meqs_supplier_id: string;

  @Field(() => String)
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  po_date: string;

  @Field(() => [CreatePoApproverSubInput])
  @IsNotEmpty({each: true})
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePoApproverSubInput)
  approvers: CreatePoApproverSubInput[];

}
