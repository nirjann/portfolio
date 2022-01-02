import { UserService } from './../user/services/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import path, { join } from 'path';
import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async generateTokens(email: string) {
    const user = await this.userService.getByEmail(email);
    if (!user) throw new NotFoundException('Email or Password is wrong');
    // create access and refresh Tokens
    console.log(process.cwd());
    const privateKey = readFileSync(
      path.resolve(__dirname, '../certs/private.pem'),
    );
    const accessToken = sign({ userId: user.id }, privateKey, {
      expiresIn: '10min',
      algorithm: 'RS256',
    });
    return accessToken;
  }
}
