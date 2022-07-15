import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}), // passport 등록
    JwtModule.register({ // jwt 등록
      secret: process.env.JWT_SECRET || jwtConfig.secret, // secret: 'Secret1234', // 토큰 만들때 이용하는 비밀 키
      signOptions: {
        expiresIn: jwtConfig.expiresIn // 60 * 60 // 몇초동안 토큰 유효한지
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // JwtStrategy auth module 에서 사용 위해
  exports: [JwtStrategy, PassportModule] // 다른 모듈에서 사용 위해
})
export class AuthModule {}

