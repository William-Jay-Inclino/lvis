import { Injectable, Logger } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { UpdateUserInput } from './dto/update-user.input';
import { Prisma, Role, User } from 'apps/system/prisma/generated/client';

@Injectable()
export class UserService {

  private readonly logger = new Logger(UserService.name);
  private includedFields = {
    user_employee: {
      include: {
        employee: true
      }
    }
  }

  constructor(private readonly prisma: PrismaService) { }

  async create(input: CreateUserInput): Promise<User> {

    const data: Prisma.UserCreateInput = {
      username: input.username,
      password: input.password,
      role: input.role ?? Role.USER
    }

    const created = await this.prisma.user.create({ data })

    this.logger.log('Successfully created User')

    return created
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: {
        is_deleted: false
      },
      include: this.includedFields
    })
  }

  async findOne(id: string): Promise<User | null> {

    const user = await this.prisma.user.findUnique({
      where: { id, is_deleted: false },
      include: this.includedFields

    })

    console.log('user', user)

    if (!user) {
      return null
    }

    return user

  }

  async findByUserName(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: this.includedFields

    })

    if (!user) {
      return null
    }

    return user

  }

  async update(id: string, input: UpdateUserInput): Promise<User> {

    const existingUser = await this.findOne(id)

    const data: Prisma.UserUpdateInput = {
      password: input.password ?? existingUser.password,
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data,
      include: this.includedFields
    })

    this.logger.log('Successfully updated User')

    return updated


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
