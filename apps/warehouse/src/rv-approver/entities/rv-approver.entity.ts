import { Field, Int, ObjectType } from "@nestjs/graphql";
import { RV } from "../../rv/entities/rv.entity";
import { APPROVAL_STATUS } from "../../__common__/types";


@ObjectType()
export class RVApprover {

    @Field(() => String)
    id: string;

    @Field(() => String)
    approver_id: string

    @Field(() => String, { nullable: true })
    approver_proxy_id: string | null

    @Field(() => String, {nullable: true})
    date_approval: string | null
    
    @Field(() => String, {nullable: true})
    notes: string | null

    @Field(() => Int)
    status: APPROVAL_STATUS

    @Field(() => String)
    label: string
    
    @Field(() => Int)
    order: number

    @Field(() => String)
    rv_id: string

    @Field(() => RV)
    rv: RV
    
    @Field(() => Date)
    created_at: Date;
  
    @Field(() => Date)
    updated_at: Date;

    @Field(() => Boolean)
    is_deleted: boolean;
    
}