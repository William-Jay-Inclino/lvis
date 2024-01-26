// update-canvass.input.ts

import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

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

  // @Field(() => [CreateItemInput], {nullable: true})
  // @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateItemInput)
  // items?: CreateItemInput[];

}
