import { IsString, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateSprInput {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  vehicle_id?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  classification_id?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  supervisor_id?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

}
