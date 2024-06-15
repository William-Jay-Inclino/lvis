import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateSprApproverSubInput {

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

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  is_supervisor: boolean;

}
