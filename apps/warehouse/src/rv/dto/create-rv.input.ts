import { InputType, Field } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateRvApproverInput } from '../../rv-approver/dto/create-rv-approver.input';

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

  @Field(() => [CreateRvApproverInput])
  @IsNotEmpty({each: true})
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRvApproverInput)
  approvers: CreateRvApproverInput[];

}
