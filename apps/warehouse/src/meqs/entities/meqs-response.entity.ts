import { Field, Int, ObjectType } from "@nestjs/graphql";
import { MEQS as M } from "apps/warehouse/prisma/generated/client";
import { MEQS } from "./meq.entity";


@ObjectType()
export class MEQSsResponse {
  @Field(() => [MEQS])
  data: M[];

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;
}