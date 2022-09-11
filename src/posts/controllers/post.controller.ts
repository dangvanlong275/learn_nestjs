import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { IPost } from 'src/posts/entities/interface/post.interface';
import { PostService } from 'src/posts/services/post.service';
import { JwtGuard } from 'src/users/jwt.guard';
import { DeleteResult, UpdateResult } from 'typeorm';

@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async create(@Body() post: IPost, @Req() req: any): Promise<IPost> {
    return await this.postService.create(req.user, post);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<IPost> {
    return await this.postService.findById(id);
  }

  @Get()
  async findAll(): Promise<IPost[]> {
    return await this.postService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() post: IPost,
  ): Observable<UpdateResult> {
    return from(this.postService.update(id, post));
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return from(this.postService.delete(id));
  }
}
