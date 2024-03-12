import { IsOptional, IsString } from 'class-validator';
import { CreateMeqsSupplierInput } from './create-meqs-supplier.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMeqsSupplierInput extends PartialType(CreateMeqsSupplierInput) {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  payment_terms: string;

}
