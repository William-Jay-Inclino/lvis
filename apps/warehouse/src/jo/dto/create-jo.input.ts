import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateJoApproverSubInput } from './create-jo-approver.sub.input';

@InputType()
export class CreateJoInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  canvass_id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  equipment?: string | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  department_id: string;

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

  @Field(() => [CreateJoApproverSubInput])
  @IsNotEmpty({ each: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJoApproverSubInput)
  approvers: CreateJoApproverSubInput[];

}
