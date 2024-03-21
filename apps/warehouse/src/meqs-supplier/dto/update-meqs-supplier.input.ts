import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateMeqsSupplierInput } from './create-meqs-supplier.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { UpdateMeqsSupplierItemSubInput } from './update-meqs-supplier-item.sub.input';
import { Type } from 'class-transformer';
import { UpdateMeqsSupplierAttachmentSubInput } from './update-meqs-supplier-attachment.sub.input';
import { CreateMeqsSupplierAttachmentSubInput } from '../../meqs/dto/create-meqs-supplier-attachment.sub.input';

@InputType()
export class UpdateMeqsSupplierInput {

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  payment_terms?: string | null;

  @Field(() => [UpdateMeqsSupplierItemSubInput], { nullable: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateMeqsSupplierItemSubInput)
  meqs_supplier_items?: UpdateMeqsSupplierItemSubInput[] | null;

  // @Field(() => [CreateMeqsSupplierAttachmentSubInput])
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateMeqsSupplierAttachmentSubInput)
  // attachments: CreateMeqsSupplierAttachmentSubInput[];

}
