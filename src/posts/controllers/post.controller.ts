import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PageOptionsDTO } from 'src/helpers/global-dto/page-options.dto';
import { PageDTO } from 'src/helpers/global-dto/page.dto';
import { ResponseSuccessDTO } from 'src/helpers/global-dto/response-success.dto';
import { IPost } from 'src/posts/entities/interface/post.interface';
import { PostService } from 'src/posts/services/post.service';
import { JwtGuard } from 'src/users/jwt.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreatePostDTO, UpdatePostDTO } from '../dto/post.dto';

@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(
    @Body() post: CreatePostDTO,
    @Req() req: any,
  ): Promise<ResponseSuccessDTO<IPost>> {
    const newPost = await this.postService.create(req.user, post);

    return new ResponseSuccessDTO(newPost, HttpStatus.CREATED);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<ResponseSuccessDTO<IPost>> {
    const post = await this.postService.with(['user', 'comments']).findById(id);

    return new ResponseSuccessDTO(post);
  }

  @Get()
  async findAll(
    @Query() pageOptionsDTO: PageOptionsDTO,
  ): Promise<PageDTO<IPost[]>> {
    const posts = await this.postService
      .with(['user', 'comments'])
      .findAll(pageOptionsDTO);

    const pageMetaDTO = await this.postService.pageMeta(
      this.postService.postRepository,
      pageOptionsDTO,
    );

    return new PageDTO(posts, pageMetaDTO);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() post: UpdatePostDTO,
  ): Promise<ResponseSuccessDTO<IPost>> {
    await this.postService.update(id, post);
    const postUpdate = await this.postService.findById(id);

    return new ResponseSuccessDTO(postUpdate);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ResponseSuccessDTO<IPost>> {
    const postDelete = await this.postService.findById(id);
    await this.postService.delete(id);

    return new ResponseSuccessDTO(postDelete);
  }
}
