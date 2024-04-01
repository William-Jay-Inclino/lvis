import { Resolver, Query, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { CreateAccountInput } from './dto/create-account.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UpdateAccountInput } from './dto/update-account.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { AccessGuard } from '../__auth__/guards/access.guard';
import { CheckAccess } from '../__auth__/check-access.decorator';
import { MODULES, RESOLVERS } from '../__common__/types';

@UseGuards(GqlAuthGuard)
@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) { }

  @Mutation(() => Account)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.ACCOUNT, RESOLVERS.createAccount)
  createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.accountService.setAuthUser(authUser)
    return this.accountService.create(createAccountInput);
  }

  @Query(() => [Account])
  accounts() {
    return this.accountService.findAll();
  }

  @Query(() => Account)
  account(@Args('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Mutation(() => Account)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.ACCOUNT, RESOLVERS.updateAccount)
  updateAccount(
    @Args('id') id: string,
    @Args('input') updateAccountInput: UpdateAccountInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.accountService.setAuthUser(authUser)
    return this.accountService.update(id, updateAccountInput);
  }

  @Mutation(() => SystemRemoveResponse)
  @UseGuards(AccessGuard)
  @CheckAccess(MODULES.ACCOUNT, RESOLVERS.removeAccount)
  removeAccount(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.accountService.setAuthUser(authUser)
    return this.accountService.remove(id);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string, id: string }): Promise<Account> {
    return await this.accountService.findOne(reference.id)
  }

}
