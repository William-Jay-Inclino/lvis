import { IsDate, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { CreateRrInput } from './create-rr.input';
import { InputType, Field, PartialType, Float, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { APPROVAL_STATUS } from '../../__common__/types';

@InputType()
export class UpdateRrInput extends PartialType(CreateRrInput) {

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  received_by_id?: string;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  canceller_id?: string;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  invoice_number?: string;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  delivery_number?: string;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  notes?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @Min(0.01, { message: 'Delivery charge must be greater than 0' })
  @IsOptional()
  delivery_charge?: number;
}
