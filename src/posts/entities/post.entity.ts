import { BaseEntity } from 'src/base/base.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
  })
  comments: Comment[];
}
