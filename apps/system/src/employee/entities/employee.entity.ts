import { ObjectType, Field } from '@nestjs/graphql';
import { Department } from '../../department/entities/department.entity';

@ObjectType()
export class Employee {

  @Field(() => String)
  id: string;

  @Field(() => String)
  employee_number: string;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  middlename: string;

  @Field(() => String)
  lastname: string;

  @Field(() => String)
  department_id: string;

  @Field(() => Department)
  department?: Department;

}
