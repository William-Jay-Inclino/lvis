import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from '../../employee/entities/employee.entity';

@ObjectType()
export class Department {

  @Field()
  id: string;

  @Field()
  code: string;

  @Field()
  name: string;

  @Field(() => Int)
  status: number;
  
  @Field(() => [Employee])
  employees?: Employee[];
}
