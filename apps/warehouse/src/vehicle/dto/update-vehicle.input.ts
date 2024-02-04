import { IsOptional, IsString } from 'class-validator';
import { CreateVehicleInput } from './create-vehicle.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVehicleInput extends PartialType(CreateVehicleInput) {

  @Field({nullable: true})
  @IsOptional()
  @IsString()
  name: string;

  @Field({nullable: true})
  @IsOptional()
  @IsString()
  plate_number: string;

}
