import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateRrItemsInput {

    @Field(() => String)
    @IsNotEmpty()
    id: string

    @Field(() => Int)
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    quantity_accepted: number

}
