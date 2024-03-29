import { ROLE, USER_STATUS } from "../../__common__/types";

export class User {
  id: string
  username: string
  firstname: string
  middlename: string
  lastname: string
  status: USER_STATUS
  role: ROLE
  password: string
  user_employee?: UserEmployee
  permissions?: string


  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;

  created_by: string;
  updated_by?: string | null;
  deleted_by?: string | null;


}

export class UserEmployee {
  id: string
  user_id: string
  user: User
  employee_id: string
  employee: Employee
}


export interface Employee {
  id: string
  firstname: string
  middlename: string
  lastname: string
  fullname?: string
}