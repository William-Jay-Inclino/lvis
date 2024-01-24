import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSprInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
