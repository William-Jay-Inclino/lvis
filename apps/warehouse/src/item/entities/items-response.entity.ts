import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Item as I } from "apps/warehouse/prisma/generated/client";
import { Item } from "./item.entity";


@ObjectType()
export class ItemsResponse {
  @Field(() => [Item])
  data: I[];

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;
}