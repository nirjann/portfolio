import { User } from './../../typedefs/User.type';
import { LoginUserDto } from './../../../dto/login-user.dto';
import { verify } from 'argon2';

export const validateUser = async (
  user: User,
  loginUserInput: LoginUserDto,
): Promise<boolean> => {
  const password = loginUserInput.password;
  const hashedPwd = user.password;
  const isVerified = await verify(hashedPwd, password);
  if (!isVerified) return false;
  return true;
};
