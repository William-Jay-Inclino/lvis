import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { faker } from '@faker-js/faker'; 

@Injectable()
export class UserService {

  private readonly users: User[] = []

  create(input: CreateUserInput): User {
    
    const x = new User()
    x.id = faker.string.uuid()
    x.username = input.username
    x.password = input.password
    x.status = 1

    this.users.push(x)

    return x
  }

  findAll() {
    return this.users
  }

  findOne(id: string) {
    return this.users.find(i => i.id === id)
  }

  async findByUserName(username: string): Promise<User>{
    return this.users.find(i => i.username === username)
  }

}
