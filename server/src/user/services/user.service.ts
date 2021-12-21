import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../graphql/typedefs/User.type';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async add(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prismaService.user.create({ data: createUserDto });
    return user;
  }

  async getById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) return null;
    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) return null;
    return user;
  }
  async getByUsername(username: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (!user) return null;
    return user;
  }
}
