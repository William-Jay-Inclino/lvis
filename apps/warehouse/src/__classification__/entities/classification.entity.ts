import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { RV } from '../../rv/entities/rv.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Classification {

  @Field(() => ID)
  id: string;

  @Field(() => [RV])
  rvs?: RV[]

}
