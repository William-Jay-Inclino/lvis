import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateJOOrderInput {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  order: number;
}
