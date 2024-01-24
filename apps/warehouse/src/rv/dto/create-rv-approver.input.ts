import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateRvApproverInput {

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    approver_id: string;

    @Field(() => Int)
    @IsInt()
    @IsNotEmpty()
    status: number;

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    label: string;

    @Field(() => Int)
    @IsInt()
    @IsNotEmpty()
    order: number;

}