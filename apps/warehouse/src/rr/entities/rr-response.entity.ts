import { Field, Int, ObjectType } from "@nestjs/graphql";
import { RR as R } from "apps/warehouse/prisma/generated/client";
import { RR } from "./rr.entity";


@ObjectType()
export class RRsResponse {
  @Field(() => [RR])
  data: R[];

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;
}