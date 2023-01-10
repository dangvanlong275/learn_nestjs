import { BaseEntity } from 'src/base/base.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('comments')
export class Comment extends BaseEntity {
  @Column()
  content: string;

  @Column({ nullable: true, default: null })
  parent_id: number;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
