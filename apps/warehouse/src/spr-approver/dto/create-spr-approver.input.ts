import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateSprApproverInput {

  @Field()
  @IsNotEmpty()
  @IsString()
  spr_id: string;

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
