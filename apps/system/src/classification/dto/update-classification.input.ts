import { IsNotEmpty, IsString } from 'class-validator';
import { CreateClassificationInput } from './create-classification.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateClassificationInput extends PartialType(CreateClassificationInput) {

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

}
