import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ResponseSuccessDTO } from 'src/helpers/global-dto/response-success.dto';
import { JwtGuard } from 'src/users/jwt.guard';
import { CreateCommentDTO } from '../dto/comment.dto';
import { IComment } from '../entities/interface/comment.interface';
import { CommentService } from '../services/comment.service';

@UseGuards(JwtGuard)
@Controller()
export class CommentController {
  constructor(private commentService: CommentService) {}
  @Post('posts/:id/comments')
  async store(
    @Param('id') postId: number,
    @Body() comment: CreateCommentDTO,
    @Req() req: any,
  ): Promise<ResponseSuccessDTO<IComment>> {
    comment.user = req.user;
    const newComment = await this.commentService.store(postId, comment);

    return new ResponseSuccessDTO(newComment);
  }
}
