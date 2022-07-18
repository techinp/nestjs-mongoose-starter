import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDTO } from './dto/user.dto';
import { ValidationPipe } from 'src/validate/validate.pipe';
import { Success, Error, CodeError } from 'src/lib/response';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Post()
  async createMember(@Body(new ValidationPipe()) user: CreateUserDTO) {
    try {
      const _user = await this.service.createMember(user);
      return Success(_user);
    } catch (error) {
      throw Error(error);
      // If you would like to custom error use below code instead
      // throw Error(CodeError.SomethingsError);
    }
  }
}
