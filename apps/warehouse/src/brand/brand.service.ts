import { Injectable } from '@nestjs/common';
import { CreateBrandInput } from './dto/create-brand.input';
import { Brand } from './entities/brand.entity';
// import { UpdateDepartmentInput } from './dto/update-department.input';
import { faker } from '@faker-js/faker'; 

@Injectable()
export class BrandService {

  private readonly brands: Brand[] = []

  create(input: CreateBrandInput): Brand {
    
    const x = new Brand()
    x.id = faker.string.uuid()
    x.name = input.name

    this.brands.push(x)

    return x
  }

  findAll() {
    return this.brands
  }

  findOne(id: string) {
    return this.brands.find(i => i.id === id)
  }
}
