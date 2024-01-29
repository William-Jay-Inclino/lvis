import { IsInt, IsOptional, IsString } from 'class-validator';
import { CreateRvApproverSettingInput } from './create-rv-approver-setting.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRvApproverSettingInput extends PartialType(CreateRvApproverSettingInput) {

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  approver_id?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  label?: string;

  @Field(() => Int, {nullable: true})
  @IsOptional()
  @IsInt()
  order?: number;
}
