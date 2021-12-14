import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { hash } from 'argon2';
import { User } from '../entities/User.entity';
import { CreateUserInput } from './../dtos/create-user.dto';
import { UserService } from './../services/User.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query((returns) => String)
  hello() {
    return 'hello ';
  }

  @Query((returns) => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.getAll();
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

  @Mutation((returns) => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    const isUser = await this.userService.get(id);
    if (!isUser) throw new BadRequestException('Bad Request');
    return this.userService.delete(id);
  }
}
