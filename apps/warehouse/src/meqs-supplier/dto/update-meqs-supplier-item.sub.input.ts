import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { VAT_TYPE } from '../../__common__/types';

@InputType()
export class UpdateMeqsSupplierItemSubInput {

    @Field()
    @IsNotEmpty()
    @IsString()
    id: string;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(0.01, { message: 'Price must be greater than 0' })
    price?: number | null;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    notes?: string | null;

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    @IsBoolean()
    is_awarded?: boolean | null;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    vat_type?: VAT_TYPE | null;

}
