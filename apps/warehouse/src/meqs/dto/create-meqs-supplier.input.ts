import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateMeqsSupplierItemInput } from './create-meqs-supplier-item.input';
import { Type } from 'class-transformer';
import { CreateMeqsSupplierAttachmentInput } from './create-meqs-supplier-attachment.input';

@InputType()
export class CreateMeqsSupplierInput {

  @Field()
  @IsNotEmpty()
  @IsString()
  supplier_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  payment_terms: string;

  @Field(() => [CreateMeqsSupplierItemInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMeqsSupplierItemInput)
  meqs_supplier_items: CreateMeqsSupplierItemInput[]; 

  @Field(() => [CreateMeqsSupplierAttachmentInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMeqsSupplierAttachmentInput)
  attachments: CreateMeqsSupplierAttachmentInput[]; 

}
