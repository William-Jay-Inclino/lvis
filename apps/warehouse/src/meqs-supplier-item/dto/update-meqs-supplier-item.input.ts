import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { CreateMeqsSupplierItemInput } from './create-meqs-supplier-item.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';
import { VAT_TYPE } from '../../__common__/types';

@InputType()
export class UpdateMeqsSupplierItemInput extends PartialType(CreateMeqsSupplierItemInput) {

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0.01, { message: 'Price must be greater than 0' })
  price?: number | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  notes?: string | null;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  is_awarded?: boolean | null;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  vat_type: VAT_TYPE;

}
