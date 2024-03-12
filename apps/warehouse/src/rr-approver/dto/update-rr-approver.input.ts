import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { CreateRrApproverInput } from './create-rr-approver.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

@InputType()
export class UpdateRrApproverInput extends PartialType(CreateRrApproverInput) {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  approver_id?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date_approval?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  status?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  label?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  order?: number;

}
