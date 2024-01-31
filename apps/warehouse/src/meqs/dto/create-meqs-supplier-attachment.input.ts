import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateMeqsSupplierAttachmentInput {

  @Field()
  @IsNotEmpty()
  @IsString()
  src: string;

}
