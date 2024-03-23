import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateJOSettingOrderInput {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  order: number;
}
