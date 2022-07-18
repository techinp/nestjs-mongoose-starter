import { IsString, IsEnum } from 'class-validator';

export class BaseUserDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class CreateUserDTO extends BaseUserDTO {}
