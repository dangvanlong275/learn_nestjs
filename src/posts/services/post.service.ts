import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
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

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<IPost>,
    private readonly userService: UserService,
  ) {}

  async create(user: IUser, post: CreatePostDTO): Promise<IPost> {
    post.user = user;
    return await this.postRepository.save(post);
  }

  async findById(id: number): Promise<IPost> {
    return await this.postRepository.findOne({
      where: {
        id: id,
      },
      relations: ['user'],
    });
  }

  async findAll(): Promise<IPost[]> {
    return await this.postRepository.find({ relations: ['user'] });
  }

  async update(id: number, post: UpdatePostDTO): Promise<UpdateResult> {
    if (isset(post.user_id)) {
      post.user = await this.userService.findById(post.user_id);
    }
    deleteProps(post, ['user_id']);

    return await this.postRepository.update(id, post);
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.postRepository.delete(id));
  }
}
