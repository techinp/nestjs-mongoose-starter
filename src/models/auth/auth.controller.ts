import { Body, Controller, Get, Post } from '@nestjs/common';
// Success and Error use in controller only
import { Success, Error } from 'src/lib/response';
import { BaseUserDTO } from '../users/dto/user.dto';
import { ValidationPipe } from 'src/validate/validate.pipe';
import { AuthService } from './auth.service';
import { User } from '../users/users.schema';
import { IResponse } from 'src/common/interfaces/response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async createMember(
    @Body(new ValidationPipe()) user: BaseUserDTO,
  ): Promise<IResponse<User>> {
    try {
      const _user = await this.authService.findOne(user);
      return Success(_user);
    } catch (error) {
      throw Error(error);
    }
  }
}
