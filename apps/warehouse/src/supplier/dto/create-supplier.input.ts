import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSupplierInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
