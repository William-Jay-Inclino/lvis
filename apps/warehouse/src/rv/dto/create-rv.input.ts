import { InputType, Field } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateRvApproverSubInput } from './create-rv-approver.sub.input';

@InputType()
export class CreateRvInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  canvass_id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  classification_id: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  supervisor_id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  work_order_no?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  work_order_date?: string | null;

  @Field(() => String)
  @IsString()
  notes: string;

  @Field(() => [CreateRvApproverSubInput])
  @IsNotEmpty({ each: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRvApproverSubInput)
  approvers: CreateRvApproverSubInput[];

}
