import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '../../../dto/create-user.dto';
import { UserService } from '../../../services/user.service';
import { User, UserWithError } from '../../typedefs/User.type';
import { createHash } from '../utils/createHash';
import { TInput, ValidateUserInput } from '../utils/validateUserInput';

@Resolver((of) => User)
export class UserResolverMutations {
  constructor(
    private readonly userService: UserService,
    private readonly validateUserInput: ValidateUserInput<TInput>,
  ) {}

  @Mutation((returns) => UserWithError)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<typeof UserWithError> {
    const { email, username } = createUserInput;
    const errors = await this.validateUserInput.validateUserInput({
      userInput: createUserInput,
    });
    if (errors) return errors;
    const modifiedUserInput = await createHash(createUserInput);
    let user;
    try {
      user = await this.userService.add(modifiedUserInput);
    } catch (err) {
      return {
        field: 'username',
        message: 'username already taken',
      };
    }
    return user;
  }
}
