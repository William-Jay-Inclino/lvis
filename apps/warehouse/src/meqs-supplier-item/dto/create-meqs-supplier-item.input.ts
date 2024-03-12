import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { VAT_TYPE } from '../../__common__/types';

@InputType()
export class CreateMeqsSupplierItemInput {

  @Field()
  @IsNotEmpty()
  @IsString()
  meqs_supplier_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  canvass_item_id: string;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01, { message: 'Price must be greater than 0' })
  price: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  notes: string

  @Field(() => Boolean)
  @IsBoolean()
  is_awarded: boolean;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  vat_type: VAT_TYPE;

}
