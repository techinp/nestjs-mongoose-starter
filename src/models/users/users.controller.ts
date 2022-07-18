import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDTO } from './dto/user.dto';
import { ValidationPipe } from 'src/validate/validate.pipe';
import { Success, Error } from 'src/lib/response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index() {
    try {
      const user = await this.userService.findAll();
      return Success(user);
    } catch (error) {
      Error(error);
    }
  }

  @Post()
  async createMember(@Body(new ValidationPipe()) user: CreateUserDTO) {
    try {
      const _user = await this.userService.createMember(user);
      return Success(_user);
    } catch (error) {
      return Error(error);
      // If you would like to custom error use below code instead
      // throw Error(CodeError.SomethingsError);
    }
  }
}
