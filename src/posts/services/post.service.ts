import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { IPost } from 'src/posts/entities/interface/post.interface';
import { IUser } from 'src/users/entities/interface/user.interface';
import { Post } from 'src/posts/entities/post.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<IPost>,
  ) {}

  async create(user: IUser, post: IPost): Promise<IPost> {
    post.user = user;
    return await this.postRepository.save(post);
  }

  async findById(id: number): Promise<IPost> {
    return await this.postRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findAll(): Promise<IPost[]> {
    return await this.postRepository.find();
  }

  update(id: number, user: IPost): Observable<UpdateResult> {
    return from(this.postRepository.update(id, user));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.postRepository.delete(id));
  }
}
