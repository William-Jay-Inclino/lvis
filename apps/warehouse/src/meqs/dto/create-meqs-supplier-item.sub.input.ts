import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { VAT_TYPE } from '../../__common__/types';

@InputType()
export class CreateMeqsSupplierItemSubInput {

  @Field()
  @IsNotEmpty()
  @IsString()
  canvass_item_id: string;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01, { message: 'Price must be greater than 0' })
  price: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  notes?: string | null;

  @Field(() => Boolean)
  @IsBoolean()
  is_awarded: boolean;

}
