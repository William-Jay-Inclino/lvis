import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { CreatePoApproverInput } from './create-po-approver.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

@InputType()
export class UpdatePoApproverInput extends PartialType(CreatePoApproverInput) {
  
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  approver_id?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  approver_proxy_id?: string;

  @Field( () => String, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date_approval?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field( () => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  status?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  label?: string;

  @Field( () => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  order?: number;

}
