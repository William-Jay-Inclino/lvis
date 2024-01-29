import { Field, Int, ObjectType } from "@nestjs/graphql";
import { RV } from "./rv.entity";
// import { Employee } from "apps/system/src/employee/entities/employee.entity";


@ObjectType()
export class RVApprover {

    @Field(() => String)
    id: string;

    @Field(() => String)
    approver_id: string

    // @Field(() => Employee)
    // approver: Employee

    @Field(() => String)
    rv_id: string

    @Field(() => RV)
    rv: RV
    
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