import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO, LoginUserDTO } from '../dto/user.dto';
import { IUser } from '../entities/interface/user.interface';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDTO: CreateUserDTO): Promise<any> {
    const user = await this.userService.create(userDTO);
    const token = this._createToken(user);
    delete user.password;

    return {
      ...user,
      token: token,
    };
  }

  async login(userDTO: LoginUserDTO): Promise<any> {
    const user = await this.userService.findByLogin(userDTO);
    const token = this._createToken(user);

    return {
      ...user,
      token: token,
    };
  }

  async validateUser(email) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ email }: IUser): any {
    return this.jwtService.sign({ email });
  }
}
