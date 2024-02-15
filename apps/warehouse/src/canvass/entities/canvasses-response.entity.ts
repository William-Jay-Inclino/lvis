import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Canvass as C } from "apps/warehouse/prisma/generated/client";
import { Canvass } from "./canvass.entity";


@ObjectType()
export class CanvassesResponse {
  @Field(() => [Canvass])
  data: C[];

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;
}