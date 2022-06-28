import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminGuard, AtGuard } from 'src/auth/guards';
import { FindAllInput } from 'src/dto/findAll';
import { CreateUserInput } from './dto/create-user.input';
import {
  UpdateUserEmailInput,
  UpdateUserPasswordInput,
} from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

// @UseGuards(AtGuard, AdminGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'user' })
  findAll(@Args('findAllInput') findAllInput: FindAllInput) {
    return this.userService.findAll(findAllInput);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUserEmail(
    @Args('updateUserInput') updateUserInput: UpdateUserEmailInput,
  ) {
    return this.userService.updateEmail(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  updateUserPassword(
    @Args('updateUserInput') updateUserInput: UpdateUserPasswordInput,
  ) {
    return this.userService.updatePassword(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  @Query(() => Boolean, { name: 'resetUsers' })
  restUsers() {
    return this.userService.resetUSers();
  }
}
