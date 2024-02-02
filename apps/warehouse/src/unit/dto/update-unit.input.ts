import { CreateUnitInput } from './create-unit.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUnitInput extends PartialType(CreateUnitInput) {
  @Field(() => String)
  name: string;
}
