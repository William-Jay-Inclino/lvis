import { ObjectType, Field, ID } from '@nestjs/graphql';
import { MeqsSupplier } from '../../meqs-supplier/entities/meqs-supplier.entity';

@ObjectType()
export class MeqsSupplierAttachment {

  @Field(() => ID)
  id: string;

  @Field(() => String)
  meqs_supplier_id: string;

  @Field(() => String)
  src: string;

  @Field(() => String)
  filename: string;

  @Field()
  created_by: string;

  @Field({ nullable: true })
  updated_by: string | null;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;


  // =============== derived / resolvers =============== 

  @Field(() => MeqsSupplier)
  meqs_supplier: MeqsSupplier

}
