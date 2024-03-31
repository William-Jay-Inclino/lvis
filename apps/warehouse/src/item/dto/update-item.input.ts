import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { CreateItemInput } from './create-item.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

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

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  alert_level?: number

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string

}
