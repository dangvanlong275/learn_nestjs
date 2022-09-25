import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUser } from '../entities/interface/user.interface';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<IUser>,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<IUser> {
    createUserDTO.password = await bcrypt.hash(createUserDTO.password, 10);

    return await this.userRepository.save(createUserDTO);
  }

  async findById(id: number): Promise<IUser> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findByLogin({ email, password }: LoginUserDTO): Promise<IUser> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
      select: ['id', 'name', 'avatar', 'email', 'password', 'created_at'],
    });

    if (!user)
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    delete user.password;

    return user;
  }

  async findAll(): Promise<IUser[]> {
    return await this.userRepository.find();
  }

  update(id: number, user: UpdateUserDTO): Observable<UpdateResult> {
    return from(this.userRepository.update(id, user));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
  }
}
