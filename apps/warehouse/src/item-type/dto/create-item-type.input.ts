import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateItemTypeInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;
}
