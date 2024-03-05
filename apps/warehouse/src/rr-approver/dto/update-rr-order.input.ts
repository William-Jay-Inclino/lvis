import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateRrOrderInput {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  order: number;
}
