import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateSupplierItemInput {
  
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  supplier_id: string;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  price: number;

}