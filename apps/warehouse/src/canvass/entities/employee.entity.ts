import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Canvass } from './canvass.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Employee {

  @Field(() => ID)
  id: string;

  @Field(() => [Canvass])
  canvasses?: Canvass[]


}
