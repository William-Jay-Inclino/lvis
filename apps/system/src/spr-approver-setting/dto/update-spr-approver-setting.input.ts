import { IsInt, IsOptional, IsString } from 'class-validator';
import { CreateSprApproverSettingInput } from './create-spr-approver-setting.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSprApproverSettingInput extends PartialType(CreateSprApproverSettingInput) {

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
