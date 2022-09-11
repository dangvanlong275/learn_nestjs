import { IsNotEmpty, IsString } from 'class-validator';
import { IUser } from '../entities/interface/user.interface';

export class UserDTO implements Readonly<IUser> {
  id: number;

  @IsString()
  name: string;

  @IsString()
  avatar?: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
