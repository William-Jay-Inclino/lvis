import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreatePositionInput } from './create-position.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePositionInput extends PartialType(CreatePositionInput) {

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  permissions?: string;

}
