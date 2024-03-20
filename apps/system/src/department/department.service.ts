import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateDepartmentInput } from './dto/create-department.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, Department } from 'apps/system/prisma/generated/client';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';

@Injectable()
export class DepartmentService {

  private readonly logger = new Logger(DepartmentService.name);
  private authUser: AuthUser

  constructor(private readonly prisma: PrismaService) { }

  setAuthUser(authUser: AuthUser) {
    this.authUser = authUser
  }

  async create(input: CreateDepartmentInput): Promise<Department> {

    const data: Prisma.DepartmentCreateInput = {
      code: input.code,
      name: input.name,
      created_by: this.authUser.user.username
    }

    const created = await this.prisma.department.create({
      data
    })

    this.logger.log('Successfully created Department')

    return created

  }

  async findAll(): Promise<Department[]> {
    return await this.prisma.department.findMany({
      where: {
        deleted_at: null
      }
    })
  }

  async findOne(id: string): Promise<Department | null> {

    const item = await this.prisma.department.findUnique({
      where: { id }
    })

    console.log('item', item, id)

    if (!item) {
      throw new NotFoundException('Department not found')
    }

    return item
  }

  async update(id: string, input: UpdateDepartmentInput): Promise<Department> {

    const existingItem = await this.findOne(id)

    const data: Prisma.DepartmentUpdateInput = {
      code: input.code ?? existingItem.code,
      name: input.name ?? existingItem.name,
      updated_by: this.authUser.user.username
    }


    const updated = await this.prisma.department.update({
      data,
      where: {
        id
      }
    })

    this.logger.log('Successfully updated Department')

    return updated

  }

  async remove(id: string): Promise<SystemRemoveResponse> {

    const existingItem = await this.findOne(id)

    await this.prisma.department.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        deleted_by: this.authUser.user.username
      }
    })

    return {
      success: true,
      msg: "Department successfully deleted"
    }

  }

}
