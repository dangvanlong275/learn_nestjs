import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'src/base/base.entity';
import { isset } from 'src/helpers/global-function/global-function';
import { PostService } from 'src/posts/services/post.service';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCommentDTO } from '../dto/comment.dto';
import { Comment } from '../entities/comment.entity';
import { IComment } from '../entities/interface/comment.interface';

@Injectable()
export class CommentService extends Model {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<IComment>,
    private readonly postService: PostService,
  ) {
    super();
  }

  async store(postId: number, comment: CreateCommentDTO): Promise<IComment> {
    comment.post = await this.postService.findById(postId);
    const commentOfPost = await this.with(['post']).findById(comment.parent_id);

    if (
      (isset(comment.parent_id) && !isset(commentOfPost)) ||
      postId != commentOfPost.post.id
    )
      throw new HttpException(
        'parent_id does not belong to this post!',
        HttpStatus.NOT_FOUND,
      );

    return await this.commentRepository.save(comment);
  }

  async findById(id: number): Promise<IComment> {
    return await this.commentRepository.findOne({
      where: {
        id: id,
      },
      relations: this.withes,
    });
  }

  async destroy(id: number): Promise<DeleteResult> {
    return this.commentRepository.delete(id);
  }
}
