import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { faker } from '@faker-js/faker'; 
import { PrismaService } from '../__prisma__/prisma.service';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateUserInput): Promise<User> {
    
    try {
            
        const item = await this.prisma.user.create({
            data: { ...input }
        })

        return await this.findOne(item.id)

    } catch (error) {
        console.log(`Failed to create user: ${error.message}`);
        throw new InternalServerErrorException('Failed to create user');
    }

  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: {
          is_deleted: false
      }
    })
  }

  async findOne(id: string): Promise<User | null> {

    return await this.prisma.user.findUniqueOrThrow({
      where: {id, is_deleted: false}
    })
  }

  async findByUserName(username: string): Promise<User>{
    return await this.prisma.user.findUniqueOrThrow({
      where: {username}
    })
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
        
    const item = await this.prisma.user.update( {
        where: { id },
        data: { ...input }
    } )

    return await this.findOne(item.id)

  }

  async remove(id: string): Promise<boolean> {
        
    await this.findOne(id)
    
    await this.prisma.user.update({
        where: { id },
        data: {
            is_deleted: true
        }
    })

    return true

  }

}
