import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Unit } from '../../unit/entities/unit.entity';
import { ItemType } from '../../item-type/entities/item-type.entity';
import { ITEM_TRANSACTION_TYPE } from '../../__common__/types';

@ObjectType()
export class ItemTransaction {

    @Field(() => ID)
    id: string;

    @Field()
    item_id: string;

    @Field()
    rr_item_id: string;

    @Field(() => Int)
    type: ITEM_TRANSACTION_TYPE;

    @Field(() => Int)
    quantity: number;

    @Field(() => Float)
    price: number;

    @Field()
    remarks: string;

    @Field(() => Boolean)
    is_initial: boolean;

}
