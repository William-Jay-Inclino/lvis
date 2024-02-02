import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUnitInput {
  @Field(() => String)
  name: string;
}
