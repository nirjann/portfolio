import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import {
  ApolloError,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { UserModule } from './user/user.module';
import { GraphQLError } from 'graphql';
import { v4 } from 'uuid';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'graphql/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      include: [UserModule],
      formatError: (error: GraphQLError) => {
        if (error instanceof ApolloError) return error;
        const id = v4();
        return new GraphQLError(`Internal Error: ${id}`);
      },
    }),
    UserModule,
  ],
})
export class AppModule {}
