import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Canvass } from '../../canvass/entities/canvass.entity';
import { RV } from '../../rv/entities/rv.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Employee {

  @Field(() => ID)
  id: string;

  @Field(() => [Canvass])
  canvasses?: Canvass[]

  @Field(() => [RV])
  rvs_supervisor?: RV[]

  @Field(() => [RV])
  rvs_canceller?: RV[]

}
