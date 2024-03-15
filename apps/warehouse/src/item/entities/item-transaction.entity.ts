import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { ITEM_TRANSACTION_TYPE } from '../../__common__/types';
import { RrItem } from '../../rr-item/entities/rr-item.entity';

@ObjectType()
export class ItemTransaction {

    @Field(() => ID)
    id: string;

    @Field()
    item_id: string;

    @Field({ nullable: true })
    rr_item_id: string | null;

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


    @Field(() => Date)
    created_at: Date;

    @Field()
    created_by: string;


    // =============== derived / resolvers =============== 

    @Field(() => RrItem, { nullable: true })
    rr_item: RrItem | null;
}
