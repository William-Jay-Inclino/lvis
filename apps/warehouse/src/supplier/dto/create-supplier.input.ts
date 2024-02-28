import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { VAT_TYPE } from '../../__common__/types';

@InputType()
export class CreateSupplierInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  contact: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  vat_type: VAT_TYPE;

}
