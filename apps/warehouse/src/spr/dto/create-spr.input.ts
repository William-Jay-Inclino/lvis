import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateSprApproverSubInput } from './create-spr-approver.sub.input';

@InputType()
export class CreateSprInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  canvass_id: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  vehicle_id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  classification_id: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  supervisor_id: string;

  @Field(() => String)
  @IsString()
  notes: string;

  @Field(() => [CreateSprApproverSubInput])
  @IsNotEmpty({ each: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSprApproverSubInput)
  approvers: CreateSprApproverSubInput[];

}
