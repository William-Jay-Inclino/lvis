import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateRRItemSubInput {

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    meqs_supplier_item_id: string;

    @Field(() => Int)
    @IsNotEmpty()
    @IsInt()
    quantity_accepted: number;

}