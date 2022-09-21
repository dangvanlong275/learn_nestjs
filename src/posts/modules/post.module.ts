import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from 'src/posts/controllers/post.controller';
import { Post } from 'src/posts/entities/post.entity';
import { PostService } from 'src/posts/services/post.service';
import { UserModule } from 'src/users/modules/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
