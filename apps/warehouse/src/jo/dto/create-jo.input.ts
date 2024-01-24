import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateJoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
