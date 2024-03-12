import { IsInt, IsOptional } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateRrItemInput {

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    quantity_accepted?: number | null

}
