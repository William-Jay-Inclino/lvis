import { IsInt, IsOptional, IsString } from 'class-validator';
import { CreateMeqsSupplierInput } from './create-meqs-supplier.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { VAT_TYPE } from '../../__common__/types';

@InputType()
export class UpdateMeqsSupplierInput extends PartialType(CreateMeqsSupplierInput) {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  payment_terms: string;

}
