import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUserAlreadyExist } from 'src/users/request/user-validation.constraint';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  avatar?: string;

  @IsNotEmpty()
  @IsUserAlreadyExist({
    message: 'Email already used',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: 'password khong duoc rong',
  })
  @IsString()
  password: string;
}
