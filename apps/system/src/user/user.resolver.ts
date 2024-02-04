import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { CurrentUser } from '../__auth__/current-user.decorator';
import { UpdateUserInput } from './dto/update-user.input';
import { Logger, NotFoundException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../__auth__/guards/gql-auth.guard';


@Resolver(() => User)
export class UserResolver {

  private readonly logger = new Logger(UserResolver.name);

  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async validateUserId(@Args('id') id: string) {
    const userFound = await this.userService.findOne(id);
    console.log('userFound', userFound)
    if(!userFound){
      throw new NotFoundException("User not found")
    }
    return userFound
  }

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
  async user(@CurrentUser() user: User, @Args('id') id: string) {
    console.log('user: current-user', user)
    const userFound = await this.userService.findOne(id);
    console.log('userFound', userFound)
    if(!userFound){
      throw new NotFoundException("User not found")
    }
    return userFound
  }
  
  // @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async getUserByUserName(@Args('username') username: string) {
    const userFound = await this.userService.findByUserName(username);
    if(!userFound){
      throw new NotFoundException("User not found")
    }
    return userFound
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
