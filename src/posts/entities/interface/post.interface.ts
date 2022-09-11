import { IUser } from '../../../users/entities/interface/user.interface';

export interface IPost {
  id?: number;
  title?: string;
  description?: string;
  user?: IUser;
}
