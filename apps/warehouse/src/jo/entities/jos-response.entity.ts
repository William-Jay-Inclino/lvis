import { Field, Int, ObjectType } from "@nestjs/graphql";
import { JO as J } from "apps/warehouse/prisma/generated/client";
import { JO } from "./jo.entity"


@ObjectType()
export class JOsResponse {
    @Field(() => [JO])
    data: J[];

    @Field(() => Int)
    totalItems: number;

    @Field(() => Int)
    currentPage: number;

    @Field(() => Int)
    totalPages: number;
}