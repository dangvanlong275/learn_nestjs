import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async update(id: number, user: UpdateUserDTO): Promise<UpdateResult> {
    return await this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
