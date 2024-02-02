import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBrandInput } from './create-brand.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBrandInput extends PartialType(CreateBrandInput) {

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;
  
}
