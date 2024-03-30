import { Injectable, Logger } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { UpdateUserInput } from './dto/update-user.input';
import { Prisma, Role, User } from 'apps/system/prisma/generated/client';
import { AuthUser } from '../__common__/auth-user.entity';
import { UsersResponse } from './entities/users-response.entity';

@Injectable()
export class UserService {

  private readonly logger = new Logger(UserService.name);
  private authUser: AuthUser

  private includedFields = {
    user_employee: {
      include: {
        employee: true
      }
    }
  }

  constructor(private readonly prisma: PrismaService) { }

  setAuthUser(authUser: AuthUser) {
    this.authUser = authUser
  }

  async create(input: CreateUserInput): Promise<User> {

    const created_by = this.authUser ? this.authUser.user.username : 'Initial'

    const data: Prisma.UserCreateInput = {
      username: input.username,
      password: input.password,
      firstname: input.firstname,
      middlename: input.middlename,
      lastname: input.lastname,
      role: input.role ?? Role.USER,
      created_by
    }

    if (input.permissions) {
      data.permissions = JSON.parse(input.permissions)
      // data.permissions = input.permissions
      // data.permissions = JSON.stringify(input.permissions)
    }

    if (input.employee_id) {
      data.user_employee = {
        create: {
          created_by,
          employee: {
            connect: { id: input.employee_id }
          }
        }
      }
    }

    const created = await this.prisma.user.create({ data })

    this.logger.log('Successfully created User')

    return created
  }

  async findAll(
    page: number,
    pageSize: number,
    searchValue?: string
  ): Promise<UsersResponse> {

    const skip = (page - 1) * pageSize;

    let whereCondition: any = {
      deleted_at: null
    };

    if (!!searchValue) {
      whereCondition = { username: { contains: searchValue.trim(), mode: 'insensitive' } }
    }

    const items = await this.prisma.user.findMany({
      orderBy: [{ lastname: 'asc' }, { firstname: 'asc' }],
      skip,
      take: pageSize,
      where: whereCondition,
    });

    const totalItems = await this.prisma.user.count({
      where: whereCondition,
    });

    return {
      data: items,
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  }

  async findOne(id: string): Promise<User | null> {

    const user = await this.prisma.user.findUnique({
      where: { id, deleted_at: null },
      include: this.includedFields

    })

    console.log('user', user)

    if (!user) {
      return null
    }

    user.permissions = JSON.stringify(user.permissions)

    return user

  }

  async findByUserName(username: string): Promise<User | null> {
    console.log('findByUserName()')
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: this.includedFields

    })

    console.log('user', user)

    if (!user) {
      return null
    }

    user.permissions = JSON.stringify(user.permissions)

    return user

  }

  async update(id: string, input: UpdateUserInput): Promise<User> {

    const existingUser = await this.findOne(id)

    const data: Prisma.UserUpdateInput = {
      updated_by: this.authUser.user.username,
      password: input.password ?? existingUser.password,
      firstname: input.firstname ?? existingUser.firstname,
      middlename: input.middlename ?? existingUser.middlename,
      lastname: input.lastname ?? existingUser.lastname,
      role: input.role ?? existingUser.role,
      status: input.status ?? existingUser.status,
      permissions: input.permissions ? JSON.parse(input.permissions) : existingUser.permissions,
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

    const query1 = this.prisma.user.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        deleted_by: this.authUser.user.username
      }
    })

    const query2 = this.prisma.userEmployee.delete({
      where: {
        user_id: id
      }
    })

    const result = await this.prisma.$transaction([query1, query2])

    console.log('result', result)

    return true

  }

  async isUsernameExist(username: string): Promise<boolean> {

    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true
      }
    })

    if (user) {
      return true
    }

    return false

  }

}
