import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

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

}
