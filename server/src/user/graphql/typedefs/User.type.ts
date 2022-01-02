import { createUnionType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class BaseError {
  @Field()
  field: string;

  @Field()
  message: string;
}

export const UserWithError = createUnionType({
  name: 'UserWithError',
  types: () => [User, BaseError],
  resolveType: (value) => {
    if ('message' in value) return BaseError;
    if ('username' in value) return User;
    return undefined;
  },
});
