import { IsOptional, IsString } from 'class-validator';
import { CreateSupplierInput } from './create-supplier.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSupplierInput extends PartialType(CreateSupplierInput) {
  
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  name?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  contact?: string | null;

}
