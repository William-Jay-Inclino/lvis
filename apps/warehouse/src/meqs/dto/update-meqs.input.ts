import { Transform, Type } from 'class-transformer';
import { IsString, IsDate, IsOptional, IsArray, ValidateNested, IsInt } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { CreateItemWithSupplierInput } from '../../item/dto/create-item-with-suppliers.input';

@InputType()
export class UpdateMeqsInput {

  @Field(() => String, {nullable: true})
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  meqs_date?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  purpose?: string;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  notes?: string;

  @Field(() => Int, {nullable: true})
  @IsInt()
  @IsOptional()
  status?: number;

  @Field(() => [CreateItemWithSupplierInput], {nullable: true})
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemWithSupplierInput)
  items?: CreateItemWithSupplierInput[];

}
