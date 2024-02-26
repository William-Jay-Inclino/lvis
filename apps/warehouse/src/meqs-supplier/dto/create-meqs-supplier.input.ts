import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { VAT_TYPE } from '../../__common__/types';

@InputType()
export class CreateMeqsSupplierInput {
  
  @Field()
  @IsNotEmpty()
  @IsString()
  meqs_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  supplier_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  payment_terms: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  vat_type: VAT_TYPE;

}
