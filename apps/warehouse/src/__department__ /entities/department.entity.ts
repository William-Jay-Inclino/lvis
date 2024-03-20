import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { JO } from '../../jo/entities/jo.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Department {

  @Field(() => ID)
  id: string;

  @Field(() => [JO])
  jos?: JO[]

}
