import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class CreateCanvassItemSubInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  brand_id?: string | null;

  // use for audit purposes
  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  brand_name?: string | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  unit_id: string;

  // use for audit purposes
  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  unit_name?: string | null;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'Quantity must be a positive integer' })
  quantity: number;

}