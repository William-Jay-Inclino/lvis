import { IsString, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateMeqsInput {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

}
