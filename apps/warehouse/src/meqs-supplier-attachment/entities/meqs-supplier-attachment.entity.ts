import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class MeqsSupplierAttachment {

  @Field(() => ID)
  id: string;

  @Field(() => String)
  meqs_supplier_id: string;

  @Field(() => String)
  src: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

}
