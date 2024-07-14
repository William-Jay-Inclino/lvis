import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class CreateCanvassItemSubInput {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  unit_id?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  item_id?: string | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'Quantity must be a positive integer' })
  quantity: number;

}