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
  name?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string

}
