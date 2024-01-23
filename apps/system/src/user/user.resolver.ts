import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { CurrentUser } from '../auth/current-user.decorator';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';


@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }
  
  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  users(@CurrentUser() user: User) {
    console.log('users: current-user', user)
    return this.userService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  user(@CurrentUser() user: User, @Args('id') id: string) {
    console.log('user: current-user', user)
    return this.userService.findOne(id);
  }
  
  @Query(() => User)
  getUserByUserName(@Args('username') username: string) {
    return this.userService.findByUserName(username);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput
  ) {
    return this.userService.update(id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  removeUser(@Args('id') id: string) {
    return this.userService.remove(id);
  }

}
