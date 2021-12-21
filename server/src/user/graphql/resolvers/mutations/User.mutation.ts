import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '../../../dto/create-user.dto';
import { UserService } from '../../../services/user.service';
import { User, UserWithError } from '../../typedefs/User.type';
import { createHash } from '../utils/createHash';
import { validateUserCreationInput } from './../utils/validateUserCreationInput';

@Resolver((of) => User)
export class UserResolverMutations {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => UserWithError)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<typeof UserWithError> {
    const { email, username } = createUserInput;
    const errors = await validateUserCreationInput(createUserInput);
    console.log(errors);
    if (errors) return errors;
    const modifiedUserInput = await createHash(createUserInput);
    const user = await this.userService.add(modifiedUserInput);
    return user;
  }
}
