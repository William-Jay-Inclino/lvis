import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateRVSettingOrderInput {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  order: number;
}
