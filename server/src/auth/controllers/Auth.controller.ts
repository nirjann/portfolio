import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Res() res: Response) {
    const result = await this.authService.generateTokens();
    res.send(result);
  }
}
