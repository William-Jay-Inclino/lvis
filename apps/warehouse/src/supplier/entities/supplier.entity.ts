import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Supplier {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
