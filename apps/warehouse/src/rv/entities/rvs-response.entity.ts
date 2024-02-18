import { Field, Int, ObjectType } from "@nestjs/graphql";
import { RV as R } from "apps/warehouse/prisma/generated/client";
import { RV } from "./rv.entity"


@ObjectType()
export class RVsResponse {
  @Field(() => [RV])
  data: R[];

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;
}