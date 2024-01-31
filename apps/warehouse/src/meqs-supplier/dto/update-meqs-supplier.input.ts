import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateMeqsSupplierInput } from './create-meqs-supplier.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMeqsSupplierInput extends PartialType(CreateMeqsSupplierInput) {

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString()
  payment_terms: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  is_referenced: boolean;

}
