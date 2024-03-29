import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User as U } from "apps/system/prisma/generated/client";
import { User } from "./user.entity";

@ObjectType()
export class UsersResponse {
  @Field(() => [User])
  data: U[];

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;
}