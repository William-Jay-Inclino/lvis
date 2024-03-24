import { ROLE, USER_STATUS } from "../../__common__/types";

export class User {
  id: string
  username: string
  status: USER_STATUS
  role: ROLE
  password: string
  user_employee?: UserEmployee
  permissions?: string
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