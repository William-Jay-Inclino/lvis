import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { PO } from '../../po/entities/po.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Account {

  @Field(() => ID)
  id: string;

  @Field(() => [PO])
  pos?: PO[]

}
