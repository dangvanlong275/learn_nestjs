import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseSuccessDTO } from 'src/helpers/global-dto/response-success.dto';
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
  ): Promise<ResponseSuccessDTO<any>> {
    userDTO.avatar = pathFile(file?.path);
    const user = await this.authService.register(userDTO);

    return new ResponseSuccessDTO(user, HttpStatus.CREATED);
  }

  @Post('login')
  async login(@Body() userDTO: LoginUserDTO): Promise<ResponseSuccessDTO<any>> {
    const user = await this.authService.login(userDTO);

    return new ResponseSuccessDTO(user);
  }
}
