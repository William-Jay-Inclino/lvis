import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';
import { Employee } from '../../employee/entities/employee.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class PoApproverSetting {
  
  @Field(() => ID)
  id: string;

  @Field(() => String)
  approver_id: string;

  @Field(() => String, { nullable: true })
  approver_proxy_id: string | null;

  @Field(() => Employee)
  approver: Employee;

  @Field(() => Employee, { nullable: true })
  approver_proxy: Employee | null;

  @Field(() => String)
  label: string;

  @Field(() => Int)
  order: number;

}
