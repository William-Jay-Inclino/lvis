import { IsInt, IsOptional, IsString } from 'class-validator';
import { CreateMeqsApproverSettingInput } from './create-meqs-approver-setting.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMeqsApproverSettingInput extends PartialType(CreateMeqsApproverSettingInput) {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  approver_id?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  label?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  order?: number;
}
