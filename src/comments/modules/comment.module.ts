import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from 'src/posts/modules/post.module';
import { UserModule } from 'src/users/modules/user.module';
import { CommentController } from '../controllers/comment.controller';
import { Comment } from '../entities/comment.entity';
import { CommentService } from '../services/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), PostModule, UserModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
