import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePOSettingOrderInput {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  order: number;
}
