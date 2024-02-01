import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateMeqsSupplierItemSubInput } from './create-meqs-supplier-item.sub.input';
import { Type } from 'class-transformer';
import { CreateMeqsSupplierAttachmentSubInput } from './create-meqs-supplier-attachment.sub.input';

@InputType()
export class CreateMeqsSupplierSubInput {

  @Field()
  @IsNotEmpty()
  @IsString()
  supplier_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  payment_terms: string;

  @Field(() => [CreateMeqsSupplierItemSubInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMeqsSupplierItemSubInput)
  meqs_supplier_items: CreateMeqsSupplierItemSubInput[]; 

  @Field(() => [CreateMeqsSupplierAttachmentSubInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMeqsSupplierAttachmentSubInput)
  attachments: CreateMeqsSupplierAttachmentSubInput[]; 

}
