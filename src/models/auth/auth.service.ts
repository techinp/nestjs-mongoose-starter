import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/users.schema';
import { BaseUserDTO } from '../users/dto/user.dto';
import { CodeError } from 'src/lib/response';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async findOne(user: BaseUserDTO): Promise<User> {
    try {
      const _user = await this.userModel.findOne({ username: user.username });
      if (_user && _user.comparePassword(user.password)) {
        return _user;
      }
      throw CodeError.AuthLoginUsernameOrPasswordMismatch;
    } catch (error) {
      throw error;
    }
  }
}
