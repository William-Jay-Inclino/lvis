import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { CreateRrApproverSubInput } from './create-rr-approver.sub.input';
import { CreateRRItemSubInput } from './create-rr-item.sub.input';

@InputType()
export class CreateRrInput {

  @Field()
  @IsString()
  @IsNotEmpty()
  po_id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  received_by_id: string;
  
  @Field()
  @IsString()
  @IsNotEmpty()
  invoice_number: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  delivery_number?: string | null;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  notes?: string | null;

  @Field(() => Float)
  @IsNumber()
  @Min(0.01, { message: 'Delivery charge must be greater than 0' })
  @IsOptional()
  delivery_charge: number;

  @Field(() => [CreateRrApproverSubInput])
  @IsNotEmpty({each: true})
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRrApproverSubInput)
  approvers: CreateRrApproverSubInput[];

  @Field(() => [CreateRRItemSubInput])
  @IsNotEmpty({each: true})
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRRItemSubInput)
  rr_items: CreateRRItemSubInput[];

}
