import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { faker } from '@faker-js/faker'; 

@Injectable()
export class UserService {

  private readonly users: User[] = [
    {
      id: faker.string.uuid(),
      username: 'jay',
      password: 'jay123',
      status: 1
    }
  ]

  create(input: CreateUserInput): User {
    
    const x = new User()
    x.id = faker.string.uuid()
    x.username = input.username
    x.password = input.password
    x.status = 1

    this.users.push(x)

    console.log('users', this.users)

    return x
  }

  findAll() {
    return this.users
  }

  async findOne(id: string): Promise<User | null> {
    const user = this.users.find(i => i.id === id)
    if(user){
      return user 
    }
    return null
  }

  async findByUserName(username: string): Promise<User>{
    console.log('users', this.users)
    return this.users.find(i => i.username === username)
  }

}
