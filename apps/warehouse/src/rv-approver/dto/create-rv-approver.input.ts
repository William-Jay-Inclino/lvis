import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateRvApproverInput {

  @Field()
  @IsNotEmpty()
  @IsString()
  rv_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  approver_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  label: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  order: number;

}
