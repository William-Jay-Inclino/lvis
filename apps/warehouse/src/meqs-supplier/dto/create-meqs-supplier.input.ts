import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMeqsSupplierAttachmentSubInput } from '../../meqs/dto/create-meqs-supplier-attachment.sub.input';
import { CreateMeqsSupplierItemSubInput } from '../../meqs/dto/create-meqs-supplier-item.sub.input';

@InputType()
export class CreateMeqsSupplierInput {

  @Field()
  @IsNotEmpty()
  @IsString()
  meqs_id: string;

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
