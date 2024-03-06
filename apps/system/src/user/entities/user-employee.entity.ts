

import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { User } from './user.entity';
import { Employee } from '../../employee/entities/employee.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class UserEmployee {

    @Field()
    id: string;

    @Field()
    user_id: string;

    @Field(() => User, { nullable: true })
    user: User;

    @Field()
    employee_id: string;

    @Field(() => Employee, { nullable: true })
    employee: Employee;

}
