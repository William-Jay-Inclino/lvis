import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {

  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  plate_number: string;

  @Field()
  created_by: string;

  @Field({ nullable: true })
  updated_by: string | null;

  @Field({ nullable: true })
  deleted_by: string | null;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date | null;

}
