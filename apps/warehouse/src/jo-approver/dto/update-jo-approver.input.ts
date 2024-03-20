import { IsDate, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { CreateJoApproverInput } from './create-jo-approver.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { APPROVAL_STATUS } from '../../__common__/types';

@InputType()
export class UpdateJoApproverInput extends PartialType(CreateJoApproverInput) {

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
  @IsEnum(APPROVAL_STATUS)
  status?: APPROVAL_STATUS;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  label?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  order?: number;


}
