import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { CreateRrInput } from './create-rr.input';
import { InputType, Field, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateRrInput extends PartialType(CreateRrInput) {

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  received_by_id?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  invoice_number?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  delivery_number?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  notes?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @Min(0.01, { message: 'Delivery charge must be greater than 0' })
  @IsOptional()
  delivery_charge?: number;
}
