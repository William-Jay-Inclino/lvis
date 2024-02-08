import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { CreateItemTransactionInput } from './create-item-transaction.input';
import { InputType, Field, PartialType, Int, Float } from '@nestjs/graphql';

@InputType()
export class UpdateItemTransactionInput extends PartialType(CreateItemTransactionInput) {

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  quantity?: number | null;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0.01, { message: 'Price must be greater than 0' })
  price?: number | null

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  remarks?: string | null

}
