import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IPost } from 'src/posts/entities/interface/post.interface';
import { IUser } from 'src/users/entities/interface/user.interface';

export class CreateCommentDTO {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  parent_id: number;

  user: IUser;
  post: IPost;
}
