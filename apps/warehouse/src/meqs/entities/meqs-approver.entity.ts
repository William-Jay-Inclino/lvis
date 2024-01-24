import { Field, Int, ObjectType } from "@nestjs/graphql";
import { MEQS } from "./meq.entity";
import { Employee } from "apps/system/src/employee/entities/employee.entity";


@ObjectType()
export class MEQSApprover {

    @Field(() => String)
    id: string;

    @Field(() => String)
    approver_id: string

    @Field(() => Employee)
    approver: Employee

    @Field(() => String)
    meqs_id: string

    @Field(() => MEQS)
    meqs: MEQS
    
    @Field(() => String, {nullable: true})
    date_approval: string | null
    
    @Field(() => String, {nullable: true})
    notes: string | null

    @Field(() => Int)
    status: number

    @Field(() => String)
    label: string
    
    @Field(() => Int)
    order: number

    @Field(() => Date)
    created_at: Date;
  
    @Field(() => Date)
    updated_at: Date;
}