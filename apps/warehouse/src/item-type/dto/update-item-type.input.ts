import { IsNotEmpty, IsString } from 'class-validator';
import { CreateItemTypeInput } from './create-item-type.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateItemTypeInput extends PartialType(CreateItemTypeInput) {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;
}
