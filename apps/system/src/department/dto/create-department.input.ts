import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateDepartmentInput {

  @Field()
  code: string;

  @Field()
  name: string;
}
