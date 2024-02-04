import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SPR } from '../../spr/entities/spr.entity';

@ObjectType()
export class Vehicle {

  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  plate_number: string;

  @Field(() => SPR)
  sprs: SPR[];

  @Field(() => Date)
  created_at: string;

  @Field(() => Date)
  updated_at: string;

}
