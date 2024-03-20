import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Department {

  @Field()
  id: string;

  @Field()
  code: string;

  @Field()
  name: string;

  @Field(() => Int)
  status: number;



  // audit fields

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
