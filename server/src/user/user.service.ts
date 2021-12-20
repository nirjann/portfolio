import { PrismaService } from './../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { User } from './graphql/typedefs/User.type';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async addUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prismaService.add(createUserDto);
    return user;
  }
}
