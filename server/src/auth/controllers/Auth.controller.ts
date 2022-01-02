import { AuthService } from './../auth.service';
import { LoginUserInput } from './../dto/login-user.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async loginUser(
    @Body() loginUserInput: LoginUserInput,
    @Res() res: Response,
  ) {
    const { email } = loginUserInput;
    const accessToken = await this.authService.generateTokens(email);
    res.send({ accessToken });
  }
}
