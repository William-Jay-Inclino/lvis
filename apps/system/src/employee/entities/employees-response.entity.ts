import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Employee } from "./employee.entity";

@ObjectType()
export class EmployeesResponse {
  @Field(() => [Employee])
  data: Employee[];

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;
}