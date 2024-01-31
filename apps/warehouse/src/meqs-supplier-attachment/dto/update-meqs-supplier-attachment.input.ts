import { IsNotEmpty, IsString } from 'class-validator';
import { CreateMeqsSupplierAttachmentInput } from './create-meqs-supplier-attachment.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMeqsSupplierAttachmentInput extends PartialType(CreateMeqsSupplierAttachmentInput) {

  @Field()
  @IsNotEmpty()
  @IsString()
  src: string;

}
