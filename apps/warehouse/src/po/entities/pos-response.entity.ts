import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PO as P } from "apps/warehouse/prisma/generated/client";
import { PO } from "./po.entity";


@ObjectType()
export class POsResponse {
  @Field(() => [PO])
  data: P[];

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;
}