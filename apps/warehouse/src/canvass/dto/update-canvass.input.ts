// update-canvass.input.ts

import { InputType, Field } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, ValidateNested, IsOptional, IsString } from 'class-validator';
import { CreateItemInput } from '../../item/dto/create-item.input';

@InputType()
export class UpdateCanvassInput {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  date_requested?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  purpose?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  requested_by_id?: string;

  @Field(() => [CreateItemInput], {nullable: true})
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemInput)
  items?: CreateItemInput[];

}
