import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateRrApproverSubInput {

    @Field()
    @IsNotEmpty()
    @IsString()
    approver_id: string;
  
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    approver_proxy_id?: string | null;
  
    @Field()
    @IsNotEmpty()
    @IsString()
    label: string;
  
    @Field( () => Int)
    @IsNotEmpty()
    @IsInt()
    order: number;

}