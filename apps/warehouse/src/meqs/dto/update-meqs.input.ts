import { Transform, Type } from 'class-transformer';
import { IsString, IsDate, IsOptional, IsInt } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateMeqsInput {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  meqs_date?: string;

  @Field(() => Int, {nullable: true})
  @IsInt()
  @IsOptional()
  status?: number;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  canceller_id?: string;

}
