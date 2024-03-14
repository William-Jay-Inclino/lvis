import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class WarehouseRemoveResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  msg: string;
}


@ObjectType()
export class WarehouseCancelResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  msg: string;

  @Field(() => Date)
  cancelled_at: Date;

  @Field(() => String)
  cancelled_by: string;
}