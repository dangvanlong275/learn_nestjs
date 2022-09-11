import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from 'src/posts/controllers/post.controller';
import { Post } from 'src/posts/entities/post.entity';
import { PostService } from 'src/posts/services/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), PostModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
