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


  // =============== audit fields =============== 

  @Field()
  created_by: string;

  @Field({ nullable: true })
  updated_by: string | null;

  @Field({ nullable: true })
  deleted_by: string | null;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date | null;



  // =============== derived / resolvers =============== 


  @Field(() => [CanvassItem])
  canvass_items: CanvassItem[];

  @Field(() => JO, { nullable: true })
  jo?: JO

  @Field(() => RV, { nullable: true })
  rv?: RV

  @Field(() => SPR, { nullable: true })
  spr?: SPR

  @Field(() => Employee)
  requested_by?: Employee;

}




