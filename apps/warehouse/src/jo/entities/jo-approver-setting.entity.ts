import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class JOApproverSetting {

    @Field(() => String)
    id: string;

    @Field(() => String)
    approver_id: string

    @Field(() => String)
    label: string

    @Field(() => Int)
    order: number

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;
}