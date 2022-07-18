import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { CreateUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<User[]> {
    const user = await this.userModel.find().exec();
    return user;
  }

  async createMember(user: CreateUserDTO): Promise<User> {
    try {
      const _user = new this.userModel(user);
      await _user.save();
      return _user;
    } catch (error) {
      throw error;
    }
  }
}
