import { UserService } from './../services/User.service';
import { CreateUserInput } from './../dtos/create-user.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../entities/User.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { hash } from 'argon2';

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
    const { password, ...restInputs } = createUserInput;
    const hashed_password = await hash(password);
    const user = await this.userService.create({
      password: hashed_password,
      ...restInputs,
    });
    if (!user) return false;
    return true;
  }
}
