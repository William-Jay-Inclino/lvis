import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateMeqsSupplierAttachmentInput } from './create-meqs-supplier-attachment.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMeqsSupplierAttachmentInput extends PartialType(CreateMeqsSupplierAttachmentInput) {

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  src?: string | null;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  filename?: string | null;

}
