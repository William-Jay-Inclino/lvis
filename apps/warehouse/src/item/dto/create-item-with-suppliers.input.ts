import { InputType, Int, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateSupplierItemInput } from './create-supplier-item.input';

@InputType()
export class CreateItemWithSupplierInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => String, {nullable: true})
  @IsNotEmpty()
  @IsString()
  brand_id: string | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  unit_id: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @Field(() => [CreateSupplierItemInput])
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSupplierItemInput)
  supplier_items: CreateSupplierItemInput[];

}