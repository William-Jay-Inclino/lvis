import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Employee {

  @Field(() => ID)
  id: string;

  @Field(() => String)
  firstname: string;

  @Field(() => String, { nullable: true })
  middlename?: string | null;

  @Field(() => String)
  lastname: string;

}
