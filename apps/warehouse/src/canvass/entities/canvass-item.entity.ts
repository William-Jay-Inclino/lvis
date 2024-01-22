import { Field, ObjectType } from "@nestjs/graphql";
import { Item } from "../../item/entities/item.entity";
import { Canvass } from "./canvass.entity";


@ObjectType()
export class CanvassItem {

    @Field(() => String)
    id: string;

    @Field(() => String)
    canvass_id: string;

    @Field(() => Canvass)
    canvass: Canvass;
    
    @Field(() => String)
    item_id: string;
    
    @Field(() => Item)
    item: Item;

    @Field(() => Date)
    created_at: Date;
  
    @Field(() => Date)
    updated_at: Date;
    
}