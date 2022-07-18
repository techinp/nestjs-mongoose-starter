import { IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  username: string;
}

export class CreateUserDTO extends UserDTO {
  @IsString()
  password: string;
}
