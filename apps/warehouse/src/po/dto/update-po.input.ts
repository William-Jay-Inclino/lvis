import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsOptional, IsArray, ValidateNested, IsInt } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePoInput {

  @Field(() => String, {nullable: true})
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  po_date?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  payment_terms?: string;

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

  // @Field(() => [CreateItemWithSupplierInput], {nullable: true})
  // @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateItemWithSupplierInput)
  // items?: CreateItemWithSupplierInput[];

}
