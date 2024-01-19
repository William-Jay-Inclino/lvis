import { IsOptional } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {

  @Field({ nullable: true })
  @IsOptional()
  password?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  status?: number;

}
