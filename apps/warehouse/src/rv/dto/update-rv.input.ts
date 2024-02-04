import { Transform} from 'class-transformer';
import { IsString, IsDate, IsOptional, IsInt, IsBoolean } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { APPROVAL_STATUS } from '../../__common__/types';

@InputType()
export class UpdateRvInput {

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  supervisor_id?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  classification_id?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date_requested?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  work_order_no?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  work_order_date?: string;

  @Field(() => Int, {nullable: true})
  @IsInt()
  @IsOptional()
  status?: APPROVAL_STATUS;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  canceller_id?: string;

}
