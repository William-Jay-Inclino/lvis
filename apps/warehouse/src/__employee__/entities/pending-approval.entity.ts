import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum PENDING_APPROVAL_TYPE {
    RV = 'RV',
    MEQS = 'MEQS',
    PO = 'PO',
    RR = 'RR'
}

registerEnumType(PENDING_APPROVAL_TYPE, {
    name: 'PENDING_APPROVAL_TYPE',
});

@ObjectType()
export class PendingApproval {

    @Field()
    id: string

    @Field(() => PENDING_APPROVAL_TYPE)
    type: PENDING_APPROVAL_TYPE

    @Field()
    description: string

    // id of either rv, meqs, po, rr
    @Field()
    reference_id: string

    @Field(() => Date)
    transaction_date: Date

}