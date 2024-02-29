import { IsOptional, IsString } from 'class-validator';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateStationInput } from './create-station.input';

@InputType()
export class UpdateStationInput extends PartialType(CreateStationInput) {
  
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  name?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  address?: string | null;

}
