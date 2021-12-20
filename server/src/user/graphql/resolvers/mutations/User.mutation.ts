import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '../../../dto/create-user.dto';
import { UserService } from '../../../user.service';
import { User } from '../../typedefs/User.type';
import { createHash } from '../utils/createHash';

@Resolver((of) => User)
export class UserResolverMutations {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<User> {
    const { email, username } = createUserInput;
    const modifiedUserInput = await createHash(createUserInput);
    const user = await this.userService.addUser(modifiedUserInput);
    return user;
  }
}
