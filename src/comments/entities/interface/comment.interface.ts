import { IPost } from 'src/posts/entities/interface/post.interface';
import { IUser } from 'src/users/entities/interface/user.interface';

export interface IComment {
  id: number;
  content: string;
  parent_id: number;
  created_at?: Date;
  updated_at?: Date;

  post: IPost;
  user: IUser;
}
