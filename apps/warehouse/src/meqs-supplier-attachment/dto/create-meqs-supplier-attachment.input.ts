import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateMeqsSupplierAttachmentInput {

  @Field()
  @IsNotEmpty()
  @IsString()
  meqs_supplier_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  src: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  filename: string;

}
