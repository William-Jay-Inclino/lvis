import { Transform } from 'class-transformer';
import { IsString, IsDate, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateRvInput {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  classification_id?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  supervisor_id?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  work_order_no?: string;


  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  work_order_date?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

}
