import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { LocalFilesInterceptor } from 'src/interceptors/upload-file.interceptor';
import { IUser } from 'src/users/entities/interface/user.interface';
import { UserService } from 'src/users/services/user.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtGuard } from '../jwt.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @Post()
  // async create(@Body() createUserDTO: CreateUserDTO): Promise<IUser> {
  //   return await this.userService.create(createUserDTO);
  // }

  @UseGuards(JwtGuard)
  @Get('profile')
  async getProfile(@Req() req: any) {
    return req.user;
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<IUser> {
    return await this.userService.findById(id);
  }

  @Get()
  async findAll(): Promise<IUser[]> {
    return await this.userService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() user: IUser,
  ): Observable<UpdateResult> {
    return from(this.userService.update(id, user));
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return from(this.userService.delete(id));
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
