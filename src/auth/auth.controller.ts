import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, HttpCode, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiProperty()
  @ApiOperation({ summary: '로그인 API', description: '로그인' }) // 요청 URL 에 매핑된 API 에 대한 설명
  @ApiCreatedResponse({ description: '로그인', type: AuthDto }) // API 응답에 대한 정의
  logIn(@Body(ValidationPipe) authDto: AuthDto): Promise<{ accessToken: string }> {
    return this.authService.login(authDto);
  }

//   @Post('/test')
//   @UseGuards(AuthGuard())
//   test(@GetUser() user: User) { // 커스텀 데코레이터
//     console.log(user);
// }
}