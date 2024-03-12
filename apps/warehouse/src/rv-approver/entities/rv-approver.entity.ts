import { Field, Int, ObjectType } from "@nestjs/graphql";
import { RV } from "../../rv/entities/rv.entity";
import { APPROVAL_STATUS } from "../../__common__/types";


@ObjectType()
export class RVApprover {

    @Field(() => String)
    id: string;

    @Field(() => String)
    rv_id: string

    @Field(() => String)
    approver_id: string

    @Field(() => String, { nullable: true })
    date_approval: string | null

    @Field(() => String)
    notes: string

    @Field(() => Int)
    status: APPROVAL_STATUS

    @Field(() => String)
    label: string

    @Field(() => Int)
    order: number

    @Field()
    created_by: string;

    @Field({ nullable: true })
    updated_by: string | null;

    @Field({ nullable: true })
    deleted_by: string | null;

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;

    @Field(() => Date, { nullable: true })
    deleted_at: Date | null;




    // =============== derived / resolvers =============== 

    @Field(() => RV)
    rv: RV

}