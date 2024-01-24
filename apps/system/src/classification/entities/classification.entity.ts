import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Classification {

  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

}

