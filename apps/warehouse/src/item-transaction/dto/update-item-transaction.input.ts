import { IsNotEmpty, IsString } from 'class-validator';
import { CreateItemTransactionInput } from './create-item-transaction.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateItemTransactionInput extends PartialType(CreateItemTransactionInput) {

  @Field()
  @IsNotEmpty()
  @IsString()
  remarks: string

}
