import { userCreationValidationSchema } from './../../../dto/validation-schemas/userCreation.schema';
import { CreateUserDto } from './../../../dto/create-user.dto';
import { BaseError } from '../../typedefs/User.type';
export const validateUserCreationInput = async (
  createUserInput: CreateUserDto,
): Promise<BaseError | null> => {
  const schema = userCreationValidationSchema;
  let errors: BaseError;
  try {
    await schema.validate(createUserInput);
  } catch (err) {
    errors = {
      field: err.path,
      message: err.errors[0],
    };
    return errors;
  }
  return null;
};
