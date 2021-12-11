import { CreateUserInput } from './../dtos/create-user.dto';
import { IUserEntity } from './User.interface';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserService implements IUserEntity<User> {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async getAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async get(id): Promise<User> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async create(createUserInput: CreateUserInput): Promise<boolean> {
    const user = this.userRepo.create(createUserInput);
    if (!user) return false;
    await this.userRepo.save(user);
    return true;
  }
}