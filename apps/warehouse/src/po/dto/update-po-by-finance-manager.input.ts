import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { APPROVAL_STATUS } from '../../__common__/types';

@InputType()
export class UpdatePoByFinanceManagerInput {

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    fund_source_id: string;

    @Field(() => String)
    @IsString()
    notes: string;

    @Field(() => Int)
    @IsNotEmpty()
    @IsEnum(APPROVAL_STATUS)
    status: APPROVAL_STATUS;

}
