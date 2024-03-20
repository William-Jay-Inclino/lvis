import { Field, Int, ObjectType } from "@nestjs/graphql";
import { SPR as S } from "apps/warehouse/prisma/generated/client";
import { SPR } from "./spr.entity"


@ObjectType()
export class SPRsResponse {
  @Field(() => [SPR])
  data: S[];

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;
}