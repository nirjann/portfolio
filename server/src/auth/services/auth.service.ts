import { TokenService } from './Token.service';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async generateTokens() {
    const result = await this.tokenService.encryptData('Hwllo World');
    return result;
  }
}
