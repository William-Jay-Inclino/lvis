import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ITEM_CLASS, VAT_TYPE } from '../../__common__/types';

@InputType()
export class CreateRRItemSubInput {

    @Field(() => String, {nullable: true})
    @IsOptional()
    @IsString()
    item_id?: string | null;

    @Field(() => String, {nullable: true})
    @IsOptional()
    @IsString()
    item_brand_id?: string | null;

    @Field(() => String, {nullable: true})
    @IsOptional()
    @IsString()
    unit_id?: string | null;

    @Field(() => Int)
    @IsNotEmpty()
    @IsEnum(ITEM_CLASS)
    item_class: ITEM_CLASS

    @Field(() => Int)
    @IsNotEmpty()
    @IsInt()
    quantity_delivered: number;

    @Field(() => Int)
    @IsNotEmpty()
    @IsInt()
    quantity_accepted: number;

    @Field()
    @IsNotEmpty()
    @IsString()
    description: string;

    @Field(() => Int)
    @IsNotEmpty()
    @IsEnum(VAT_TYPE)
    vat_type: VAT_TYPE

    @Field(() => Float)
    @IsNotEmpty()
    @IsNumber()
    @Min(0.01, { message: 'Gross price must be greater than 0' })
    gross_price: number

    @Field(() => Float)
    @IsNotEmpty()
    @IsNumber()
    @Min(0.01, { message: 'Net price must be greater than 0' })
    net_price: number

}