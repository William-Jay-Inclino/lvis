import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCanvassItemInput {

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  canvass_id?: string | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  brand_id?: string | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  unit_id: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  quantity: number;

}