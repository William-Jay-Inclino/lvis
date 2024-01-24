import { CreateSprInput } from './create-spr.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSprInput extends PartialType(CreateSprInput) {
  @Field(() => Int)
  id: number;
}
