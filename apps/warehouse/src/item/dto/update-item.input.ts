import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { CreateItemInput } from './create-item.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  item_type_id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  unit_id?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  code?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string

  @Field(() => Int, {nullable: true})
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Quantity must be a positive integer' })
  quantity?: number

  @Field(() => Int, {nullable: true})
  @IsOptional()
  @IsInt()
  initial_quantity?: number

  @Field(() => Float, {nullable: true})
  @IsOptional()
  @IsNumber()
  @Min(0.01, { message: 'Average Price must be greater than 0' })
  average_price?: number

  @Field(() => Float, {nullable: true})
  @IsOptional()
  @IsNumber()
  @Min(0.01, { message: 'Initial Average Price must be greater than 0' })
  initial_average_price?: number

}
