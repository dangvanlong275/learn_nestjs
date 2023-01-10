import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPost } from 'src/posts/entities/interface/post.interface';
import { IUser } from 'src/users/entities/interface/user.interface';
import { Post } from 'src/posts/entities/post.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePostDTO, UpdatePostDTO } from '../dto/post.dto';
import {
  deleteProps,
  isset,
} from 'src/helpers/global-function/global-function';
import { UserService } from 'src/users/services/user.service';
import { Model } from 'src/base/base.entity';
import { PageOptionsDTO } from 'src/helpers/global-dto/page-options.dto';

@Injectable()
export class PostService extends Model {
  constructor(
    @InjectRepository(Post)
    @Inject(forwardRef(() => UserService))
    public readonly postRepository: Repository<IPost>,
    private readonly userService: UserService,
  ) {
    super();
  }

  async create(user: IUser, post: CreatePostDTO): Promise<IPost> {
    post.user = user;
    return await this.postRepository.save(post);
  }

  async findById(id: number): Promise<IPost> {
    return await this.postRepository.findOne({
      where: {
        id: id,
      },
      relations: this.withes,
    });
  }

  async findAll({ skip, per_page }: PageOptionsDTO): Promise<IPost[]> {
    return await this.postRepository.find({
      relations: this.withes,
      order: {
        created_at: 'DESC',
        comments: {
          created_at: 'DESC',
        },
      },
      skip: skip,
      take: per_page,
    });
  }

  async findPostByAuthor(
    userId: number,
    { per_page, skip }: PageOptionsDTO,
  ): Promise<IPost[]> {
    this.where({
      user: {
        id: userId,
      },
    });

    return await this.postRepository.find({
      where: this.whereOptions,
      relations: this.withes,
      order: {
        created_at: 'DESC',
        comments: {
          created_at: 'DESC',
        },
      },
      skip: skip,
      take: per_page,
    });
  }

  async update(id: number, post: UpdatePostDTO): Promise<UpdateResult> {
    if (isset(post.user_id)) {
      post.user = await this.userService.findById(post.user_id);
    }
    deleteProps(post, ['user_id']);

    return await this.postRepository.update(id, post);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.postRepository.delete(id);
  }
}
