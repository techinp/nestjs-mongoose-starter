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

  async findOne(username: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ username }).exec();
      return user;
    } catch (error) {
      console.log('error wkemfwkemf', error);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const user = await this.userModel.find().lean().exec();
      return user;
    } catch (error) {
      throw error;
    }
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
