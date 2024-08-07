import { Resolver, Query, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Logger, NotFoundException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';
import { AuthUser } from '../__common__/auth-user.entity';
import { CurrentAuthUser } from '../__auth__/current-auth-user.decorator';
import { UsersResponse } from './entities/users-response.entity';
import { SystemRemoveResponse } from '../__common__/classes';


@Resolver(() => User)
export class UserResolver {

  private readonly logger = new Logger(UserResolver.name);

  constructor(private readonly userService: UserService) { }

  @Query(() => User)
  async validateUserId(@Args('id') id: string) {
    const userFound = await this.userService.findOne(id);
    console.log('userFound', userFound)
    if (!userFound) {
      throw new NotFoundException("User not found")
    }
    return userFound
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  createUser(
    @Args('input') input: CreateUserInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.userService.setAuthUser(authUser)
    return this.userService.create(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UsersResponse)
  users(
    @Args('page') page?: number,
    @Args('pageSize') pageSize?: number,
    @Args('searchValue', { nullable: true }) searchValue?: string,
  ) {
    return this.userService.findAll(page, pageSize, searchValue);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async user(@CurrentAuthUser() user: User, @Args('id') id: string) {
    console.log('user: current-user', user)
    return await this.userService.findOne(id);
  }

  // @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async getUserByUserName(@Args('username') username: string) {
    const userFound = await this.userService.findByUserName(username);
    if (!userFound) {
      throw new NotFoundException("User not found")
    }
    return userFound
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.userService.setAuthUser(authUser)
    return this.userService.update(id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SystemRemoveResponse)
  removeUser(
    @Args('id') id: string,
    @CurrentAuthUser() authUser: AuthUser
  ) {
    this.userService.setAuthUser(authUser)
    return this.userService.remove(id);
  }

  @Query(() => Boolean)
  isUsernameExist(
    @Args('username') username: string
  ) {
    return this.userService.isUsernameExist(username);
  }


  @ResolveReference()
  async resolveReference(reference: { __typename: string, id?: string, username?: string }) {

    console.log('reference', reference)

    if (reference.__typename === 'User' && reference.id) {
      return await this.userService.findOne(reference.id)
    }

    if (reference.__typename === 'User' && reference.username) {
      return await this.userService.findByUserName(reference.username)
    }

  }

}
