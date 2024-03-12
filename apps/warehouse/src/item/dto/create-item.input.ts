import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class CreateItemInput {

  @Field()
  @IsNotEmpty()
  @IsString()
  item_type_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  unit_id: string

  @Field()
  @IsNotEmpty()
  @IsString()
  code: string

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string

  @Field()
  @IsOptional()
  @IsString()
  description?: string | null

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  initial_quantity: number

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01, { message: 'Initial Average Price must be greater than 0' })
  initial_average_price: number

}
