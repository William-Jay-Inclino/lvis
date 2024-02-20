import { ObjectType, Field, ID } from '@nestjs/graphql';
import { JO } from '../../jo/entities/jo.entity';
import { RV } from '../../rv/entities/rv.entity';
import { SPR } from '../../spr/entities/spr.entity';
import { Employee } from '../../__employee__/entities/employee.entity';
import { CanvassItem } from '../../canvass-item/entities/canvass-item.entity';

@ObjectType()
export class Canvass {

  @Field(() => ID)
  id: string;

  @Field(() => String)
  rc_number: string;

  @Field(() => Date)
  date_requested: Date;

  @Field(() => String)
  purpose: string;

  @Field(() => String)
  notes: string;

  @Field(() => String)
  requested_by_id: string;

  @Field(() => Employee)
  requested_by?: Employee;

  @Field()
  created_by_id: string;

  @Field(() => [CanvassItem])
  canvass_items: CanvassItem[];

  @Field(() => Boolean)
  is_referenced: boolean;

  @Field( () => JO)
  jo?: JO

  @Field( () => RV)
  rv?: RV

  @Field( () => SPR)
  spr?: SPR

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

}




