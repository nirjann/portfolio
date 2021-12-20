import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;
}

@ObjectType()
export class AlreadyExistsError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class IncorrectPasswordError {}
