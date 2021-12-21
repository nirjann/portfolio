import { UserResolverQueries } from './graphql/resolvers/queries/User.query';
import { UserResolverMutations } from './graphql/resolvers/mutations/User.mutation';
import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';

@Module({
  providers: [UserService, UserResolverMutations, UserResolverQueries],
})
export class UserModule {}
