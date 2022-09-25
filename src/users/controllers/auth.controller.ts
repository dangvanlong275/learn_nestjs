import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { pathFile } from 'src/helpers/global-function/global-function';
import { LocalFilesInterceptor } from 'src/interceptors/upload-file.interceptor';
import { CreateUserDTO, LoginUserDTO } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @UseInterceptors(
    LocalFilesInterceptor({
      typeUpload: 'single',
      fieldName: 'avatar',
      path: User.pathAvatar(),
    }),
  )
  async register(
    @Body() userDTO: CreateUserDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    userDTO.avatar = pathFile(file?.path);
    return await this.authService.register(userDTO);
  }

  @Post('login')
  async login(@Body() userDTO: LoginUserDTO): Promise<any> {
    return await this.authService.login(userDTO);
  }
}
