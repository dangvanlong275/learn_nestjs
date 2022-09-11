import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/users/controllers/user.controller';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/services/user.service';
import { AuthController } from '../controllers/auth.controller';
import { JwtStrategy } from '../jwt.strategy';
import { AuthService } from '../services/auth.service';
import * as dotenv from 'dotenv';
import { IsUserAlreadyExistConstraint } from '../request/user-validation.constraint';
dotenv.config();

const providerValidator = [IsUserAlreadyExistConstraint];

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.TOKEN_SECRET,
        signOptions: {
          expiresIn: process.env.EXPIRED,
        },
      }),
    }),
  ],
  providers: [...providerValidator, UserService, AuthService, JwtStrategy],
  controllers: [UserController, AuthController],
})
export class UserModule {}
