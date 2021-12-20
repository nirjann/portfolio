import { User } from './../../typedefs/User.type';
import { Query, Resolver } from '@nestjs/graphql';
@Resolver((of) => User)
export class UserResolverQueries {
  @Query(() => String)
  hello() {
    return 'hello world';
  }
}
