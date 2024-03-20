import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { CreateAccountInput } from './dto/create-account.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { UpdateAccountInput } from './dto/update-account.input';
import { SystemRemoveResponse } from '../__common__/classes';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';

@UseGuards(GqlAuthGuard)
@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) { }

  @Mutation(() => Account)
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
  updateAccount(
    @Args('id') id: string,
    @Args('input') updateAccountInput: UpdateAccountInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.accountService.setAuthUser(authUser)
    return this.accountService.update(id, updateAccountInput);
  }

  @Mutation(() => SystemRemoveResponse)
  removeAccount(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.accountService.setAuthUser(authUser)
    return this.accountService.remove(id);
  }

}
