import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';
import { DepartmentStatus } from '../../__common__/types';

@ObjectType()
@Directive('@key(fields: "id")')
export class Department {

  @Field(() => ID)
  id: string;

  @Field()
  code: string;

  @Field()
  name: string;

  @Field(() => Int)
  status: DepartmentStatus;



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
