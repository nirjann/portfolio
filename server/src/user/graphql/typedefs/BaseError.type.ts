import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BaseError {
  @Field()
  field: string;

  @Field()
  message: string;
}
