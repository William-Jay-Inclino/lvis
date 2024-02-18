import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Brand } from '../../brand/entities/brand.entity';
import { Unit } from '../../unit/entities/unit.entity';

@ObjectType()
export class CanvassItem {

  @Field(() => String)
  id: string;

  @Field(() => String)
  canvass_id: string;

  @Field(() => String)
  description: string;

  @Field(() => String, {nullable: true})
  brand_id: string | null;

  @Field(() => Brand, {nullable: true})
  brand: Brand | null;

  @Field(() => String, { nullable: true })
  unit_id: string;

  @Field(() => Unit, { nullable: true })
  unit: Unit;

  @Field(() => Int)
  quantity: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

}

