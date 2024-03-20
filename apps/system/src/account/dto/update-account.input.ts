import { IsOptional } from 'class-validator';
import { CreateAccountInput } from './create-account.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput extends PartialType(CreateAccountInput) {

  @Field({ nullable: true })
  @IsOptional()
  code?: string;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;
}
