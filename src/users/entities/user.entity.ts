import { BaseEntity } from 'src/base/base.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { IUser } from './interface/user.interface';

@Entity('users')
export class User extends BaseEntity implements IUser {
  @Column()
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
  })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
  })
  comments: Comment[];

  static pathAvatar = (): string => {
    return '/avatars';
  };
}
