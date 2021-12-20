import { hash } from 'argon2';
import { CreateUserDto } from './../../../dto/create-user.dto';
export const createHash = async (createUserDto: CreateUserDto) => {
  const { password, ...restUserInputs } = createUserDto;
  const hashedPwd = await hash(password);
  const userInputWithHashedPwd: CreateUserDto = {
    ...restUserInputs,
    password: hashedPwd,
  };
  return userInputWithHashedPwd;
};
