import { IComment } from 'src/comments/entities/interface/comment.interface';
import { IUser } from '../../../users/entities/interface/user.interface';

export interface IPost {
  id: number;
  title: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  user: IUser;
  comments?: IComment[];
}
