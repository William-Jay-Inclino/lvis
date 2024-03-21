import { Field, ObjectType } from "@nestjs/graphql";
import { RrItem as R } from "./rr-item.entity";
import { RRItem } from "apps/warehouse/prisma/generated/client";

@ObjectType()
export class UpdateRrItemsResponse {
    @Field(() => Boolean)
    success: boolean;

    @Field()
    msg: string

    @Field(() => [R])
    data: RRItem[];
}