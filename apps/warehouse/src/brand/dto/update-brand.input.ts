import { CreateBrandInput } from './create-brand.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBrandInput extends PartialType(CreateBrandInput) {
  @Field(() => String)
  name: string;
}
