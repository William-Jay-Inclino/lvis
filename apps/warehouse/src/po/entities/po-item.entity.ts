import { Field, ObjectType } from "@nestjs/graphql";
import { PO } from "./po.entity";


@ObjectType()
export class POItem {

    @Field(() => String)
    id: string;

    @Field(() => String)
    po_id: string;

    @Field(() => PO)
    pos: PO;
    
    @Field(() => String)
    item_id: string;
    
    // @Field(() => Item)
    // item: Item;

    @Field(() => Date)
    created_at: Date;
  
    @Field(() => Date)
    updated_at: Date;
    
}