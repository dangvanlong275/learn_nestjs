import { IsNotEmpty, IsString } from 'class-validator';
import { IUser } from 'src/users/entities/interface/user.interface';

export class CreatePostDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;

  user: IUser;
}

export class UpdatePostDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  user_id: number;

  user: IUser;
}
