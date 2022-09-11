import { IPost } from 'src/posts/entities/interface/post.interface';

export interface IUser {
  id: number;
  name: string;
  avatar?: string;
  email: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
  posts?: IPost[];
}
