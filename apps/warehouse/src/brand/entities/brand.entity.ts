import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Brand {
  
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

}
