import { Transform } from 'class-transformer';
import { IsString, IsDate, IsOptional, IsInt, IsBoolean } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { APPROVAL_STATUS } from '../../__common__/types';

@InputType()
export class UpdatePoInput {

  @Field(() => String, {nullable: true})
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  po_date?: string;

  @Field(() => Int, {nullable: true})
  @IsInt()
  @IsOptional()
  status?: APPROVAL_STATUS;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  canceller_id?: string;

}
