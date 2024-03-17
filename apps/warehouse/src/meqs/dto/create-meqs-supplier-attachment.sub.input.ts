import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateMeqsSupplierAttachmentSubInput {

  @Field()
  @IsNotEmpty()
  @IsString()
  src: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  filename: string;

}
