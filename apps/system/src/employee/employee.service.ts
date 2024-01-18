import { Injectable } from '@nestjs/common';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { Employee } from './entities/employee.entity';
// import { UpdateDepartmentInput } from './dto/update-department.input';
import { faker } from '@faker-js/faker'; 

@Injectable()
export class EmployeeService {

  private readonly employees: Employee[] = []

  create(input: CreateEmployeeInput): Employee {
    
    const x = new Employee()
    x.id = faker.string.uuid()
    x.firstname = input.firstname
    x.middlename = input.middlename
    x.lastname = input.lastname
    x.department_id = input.department_id
    x.employee_number = input.employee_number

    this.employees.push(x)

    return x
  }

  findAll() {
    return this.employees
  }

  findOne(id: string) {
    return this.employees.find(i => i.id === id)
  }
}
