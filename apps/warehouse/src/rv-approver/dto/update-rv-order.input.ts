import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateRVOrderInput {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  order: number;
}
