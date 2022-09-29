import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
  password: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  name: string;

  avatar?: string;

  @IsOptional()
  @IsUserAlreadyExist({
    message: 'Email already used',
  })
  @IsEmail()
  email: string;
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
