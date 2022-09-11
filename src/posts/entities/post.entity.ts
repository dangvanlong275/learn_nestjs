import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 1 })
  user_id: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}