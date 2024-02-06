import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

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
  description: string

  // @Field(() => Int)
  // @IsNotEmpty()
  // @IsInt()
  // @Min(1, { message: 'Quantity must be a positive integer' })
  // quantity: number

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  initial_quantity: number

  // @Field(() => Float)
  // @IsNotEmpty()
  // @IsNumber()
  // @Min(0.01, { message: 'Average Price must be greater than 0' })
  // average_price: number

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01, { message: 'Initial Average Price must be greater than 0' })
  initial_average_price: number

}
