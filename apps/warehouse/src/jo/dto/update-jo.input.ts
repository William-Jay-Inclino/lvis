import { CreateJoInput } from './create-jo.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateJoInput extends PartialType(CreateJoInput) {
  @Field(() => Int)
  id: number;
}
