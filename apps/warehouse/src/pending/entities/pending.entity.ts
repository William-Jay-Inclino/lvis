import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Pending {

  @Field( () => Int )
  id: string;

  @Field()
  approver_id: string;

  @Field()
  reference_number: string;

  @Field()
  reference_table: string;

  @Field()
  description: string;

  @Field( () => Date)
  transaction_date: Date;

}
