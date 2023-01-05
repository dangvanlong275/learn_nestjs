import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PageOptionsDTO } from 'src/helpers/global-dto/page-options.dto';
import { PageDTO } from 'src/helpers/global-dto/page.dto';
import { ResponseSuccessDTO } from 'src/helpers/global-dto/response-success.dto';
import { LocalFilesInterceptor } from 'src/interceptors/upload-file.interceptor';
import { IPost } from 'src/posts/entities/interface/post.interface';
import { PostService } from 'src/posts/services/post.service';
import { IUser } from 'src/users/entities/interface/user.interface';
import { UserService } from 'src/users/services/user.service';
import { UpdateUserDTO } from '../dto/user.dto';
import { JwtGuard } from '../jwt.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  // @Post()
  // async create(@Body() createUserDTO: CreateUserDTO): Promise<IUser> {
  //   return await this.userService.create(createUserDTO);
  // }

  @UseGuards(JwtGuard)
  @Get('profile')
  async getProfile(@Req() req: any) {
    return new ResponseSuccessDTO(req.user);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<ResponseSuccessDTO<IUser>> {
    const user = await this.userService.findById(id);

    return new ResponseSuccessDTO(user);
  }

  @Get()
  async findAll(
    @Query() pageOptionsDTO: PageOptionsDTO,
  ): Promise<PageDTO<IUser[]>> {
    const users = await this.userService.findAll(pageOptionsDTO);
    const pageMetaDTO = await this.postService.pageMeta(
      this.userService.userRepository,
      pageOptionsDTO,
    );

    return new PageDTO(users, pageMetaDTO);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() user: UpdateUserDTO,
  ): Promise<ResponseSuccessDTO<IUser>> {
    await this.userService.update(id, user);
    const userUpdate = await this.userService.findById(id);

    return new ResponseSuccessDTO(userUpdate);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ResponseSuccessDTO<IUser>> {
    const userDelete = await this.userService.findById(id);
    await this.userService.delete(id);

    return new ResponseSuccessDTO(userDelete);
  }

  @Get(':id/posts')
  async findPostByAuthor(
    @Param('id') userId: number,
    @Query() pageOptionsDTO: PageOptionsDTO,
  ): Promise<PageDTO<IPost[]>> {
    const posts = await this.postService
      .with(['user', 'comments'])
      .findPostByAuthor(userId, pageOptionsDTO);

    const pageMetaDTO = await this.postService.pageMeta(
      this.postService.postRepository,
      pageOptionsDTO,
    );

    return new PageDTO(posts, pageMetaDTO);
  }

  @Post('upload')
  @UseInterceptors(
    LocalFilesInterceptor({
      typeUpload: 'multiple',
      fieldName: 'files',
      path: '/avatars',
    }),
  )
  uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    const response: any = [];
    console.log(files);
    files.map((file) => {
      const fileResponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileResponse);
    });

    return response;
  }
}
