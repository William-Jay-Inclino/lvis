import { Injectable } from '@nestjs/common';
import { CreateDepartmentInput } from './dto/create-department.input';
import { Department } from './entities/department.entity';
// import { UpdateDepartmentInput } from './dto/update-department.input';
import { faker } from '@faker-js/faker'; 

@Injectable()
export class DepartmentService {

  private readonly departments: Department[] = []

  create(input: CreateDepartmentInput): Department {
    
    const x = new Department()
    x.id = faker.string.uuid()
    x.code = input.code
    x.name = input.name
    x.status = 1

    this.departments.push(x)

    return x
  }

  findAll() {
    return this.departments
  }

  findOne(id: string) {
    return this.departments.find(i => i.id === id)
  }
}
