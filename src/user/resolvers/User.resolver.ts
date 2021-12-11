import { UserService } from './../services/User.service';
import { CreateUserInput } from './../dtos/create-user.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../entities/User.entity';
import { InternalServerErrorException } from '@nestjs/common';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query((returns) => String)
  hello() {
    return 'hello ';
  }

  @Mutation((returns) => Boolean)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<boolean> {
    const user = await this.userService.create(createUserInput);
    if (!user) new InternalServerErrorException();
    return true;
  }
}
