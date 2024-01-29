import { Field, ObjectType } from "@nestjs/graphql";
import { MEQS } from "./meq.entity";


@ObjectType()
export class MEQSItem {

    @Field(() => String)
    id: string;

    @Field(() => String)
    meqs_id: string;

    @Field(() => MEQS)
    meqs: MEQS;
    
    @Field(() => String)
    item_id: string;
    
    // @Field(() => Item)
    // item: Item;

    @Field(() => Date)
    created_at: Date;
  
    @Field(() => Date)
    updated_at: Date;
    
}