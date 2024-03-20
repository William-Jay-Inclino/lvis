import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateAccountInput } from './dto/create-account.input';
import { PrismaService } from '../__prisma__/prisma.service';
import { Prisma, Account } from 'apps/system/prisma/generated/client';
import { UpdateAccountInput } from './dto/update-account.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';

@Injectable()
export class AccountService {

  private readonly logger = new Logger(AccountService.name);
  private authUser: AuthUser

  constructor(private readonly prisma: PrismaService) { }

  setAuthUser(authUser: AuthUser) {
    this.authUser = authUser
  }

  async create(input: CreateAccountInput): Promise<Account> {

    const data: Prisma.AccountCreateInput = {
      code: input.code,
      name: input.name,
      description: input.description,
      created_by: this.authUser.user.username
    }

    const created = await this.prisma.account.create({
      data
    })

    this.logger.log('Successfully created Account')

    return created

  }

  async findAll(): Promise<Account[]> {
    return await this.prisma.account.findMany({
      where: {
        deleted_at: null
      }
    })
  }

  async findOne(id: string): Promise<Account | null> {

    const item = await this.prisma.account.findUnique({
      where: { id }
    })

    console.log('item', item, id)

    if (!item) {
      throw new NotFoundException('Account not found')
    }

    return item
  }

  async update(id: string, input: UpdateAccountInput): Promise<Account> {

    const existingItem = await this.findOne(id)

    const data: Prisma.AccountUpdateInput = {
      code: input.code ?? existingItem.code,
      name: input.name ?? existingItem.name,
      description: input.name ?? existingItem.description,
      updated_by: this.authUser.user.username
    }


    const updated = await this.prisma.account.update({
      data,
      where: {
        id
      }
    })

    this.logger.log('Successfully updated Account')

    return updated

  }

  async remove(id: string): Promise<SystemRemoveResponse> {

    const existingItem = await this.findOne(id)

    await this.prisma.account.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        deleted_by: this.authUser.user.username
      }
    })

    return {
      success: true,
      msg: "Account successfully deleted"
    }

  }

}
