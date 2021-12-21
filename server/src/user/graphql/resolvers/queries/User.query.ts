import { UserService } from './../../../services/user.service';
import { PrismaService } from './../../../../prisma/prisma.service';
import { User, UserWithError } from './../../typedefs/User.type';
import { Args, Query, Resolver } from '@nestjs/graphql';
@Resolver((of) => User)
export class UserResolverQueries {
  constructor(private readonly userService: UserService) {}
  @Query(() => UserWithError)
  async getCurrentUser(@Args('id') id: string): Promise<typeof UserWithError> {
    let user;
    try {
      user = await this.userService.getById(id);
    } catch (err) {
      return {
        field: 'username',
        message: 'user cannot be found',
      };
    }
    return user;
  }
}
