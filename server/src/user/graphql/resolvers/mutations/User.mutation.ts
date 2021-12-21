import { validateUserCreationInput } from './../utils/validateUserCreationInput';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '../../../dto/create-user.dto';
import { UserService } from '../../../user.service';
import { User } from '../../typedefs/User.type';
import { createHash } from '../utils/createHash';
import { BaseError } from '../../typedefs/BaseError.type';

@Resolver((of) => User)
export class UserResolverMutations {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<User | BaseError> {
    const { email, username } = createUserInput;
    const errors = await validateUserCreationInput(createUserInput);
    console.log(errors);
    if (errors) return errors;
    const modifiedUserInput = await createHash(createUserInput);
    const user = await this.userService.addUser(modifiedUserInput);
    return user;
  }
}
