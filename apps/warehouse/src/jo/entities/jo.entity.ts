import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class JO {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
