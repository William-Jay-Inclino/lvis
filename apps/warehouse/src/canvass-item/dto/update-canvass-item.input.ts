import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateCanvassItemInput {

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  canvass_id?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  brand_id?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  unit_id?: string;

  @Field(() => Int, {nullable: true})
  @IsOptional()
  @IsInt()
  quantity?: number;

}
