import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateOrderInput {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  order: number;
}
