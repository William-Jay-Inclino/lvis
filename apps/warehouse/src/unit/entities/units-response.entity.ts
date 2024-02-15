import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Unit } from "./unit.entity";

@ObjectType()
export class UnitsResponse {
  @Field(() => [Unit])
  data: Unit[];

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;
}