import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePoOrderInput {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  order: number;
}
