import { User } from './entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/User.service';
import { UserResolver } from './resolvers/User.resolver';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService],
})
export class UserModule {}
