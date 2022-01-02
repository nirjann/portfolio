import { TokenService } from './services/Token.service';
import { Module } from '@nestjs/common';
import { UserModule } from './../user/user.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/Auth.controller';

@Module({
  imports: [UserModule],
  providers: [AuthService, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
