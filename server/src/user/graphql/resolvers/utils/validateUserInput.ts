import { LoginUserDto } from './../../../dto/login-user.dto';
import { CreateUserDto } from './../../../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { userCreationValidationSchema } from '../../../dto/validation-schemas/userCreation.schema';
import { BaseError } from '../../typedefs/User.type';

export interface TInput {
  userInput: CreateUserDto | LoginUserDto;
}

@Injectable()
export class ValidateUserInput<TInput> {
  async validateUserInput(userInput: TInput): Promise<BaseError | null> {
    const schema = userCreationValidationSchema;
    let errors: BaseError;
    try {
      await schema.validate(userInput);
    } catch (err) {
      errors = {
        field: err.path,
        message: err.errors[0],
      };
      return errors;
    }
    return null;
  }
}
