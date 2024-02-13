import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { CreateRRItemInput } from './create-rr-item.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';
import { ITEM_CLASS, VAT_TYPE } from '../../__common__/types';

@InputType()
export class UpdateRrItemInput extends PartialType(CreateRRItemInput) {

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

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsEnum(ITEM_CLASS)
    item_class?: ITEM_CLASS | null

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    quantity_delivered?: number | null

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    quantity_accepted?: number | null

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string | null

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsEnum(VAT_TYPE)
    vat_type?: VAT_TYPE | null

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(0.01, { message: 'Gross price must be greater than 0' })
    gross_price?: number | null

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(0.01, { message: 'Net price must be greater than 0' })
    net_price?: number | null

}
