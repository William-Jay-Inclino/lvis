import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ITEM_TRANSACTION_TYPE } from '../../__common__/types';

@InputType()
export class CreateItemTransactionInput {

  @Field()
  @IsNotEmpty()
  @IsString()
  item_id: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsEnum(ITEM_TRANSACTION_TYPE)
  type: ITEM_TRANSACTION_TYPE;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01, { message: 'Price must be greater than 0' })
  price: number

  @Field({nullable: true})
  @IsOptional()
  @IsString()
  remarks?: string | null

}
