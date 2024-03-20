import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateSPROrderInput {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  order: number;
}
