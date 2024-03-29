import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Employee } from "./employee.entity";
import { Employee as E } from "apps/system/prisma/generated/client";

@ObjectType()
export class EmployeesResponse {
  @Field(() => [Employee])
  data: E[];

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;
}