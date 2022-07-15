import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, HttpCode, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @HttpCode(200)
  @Post('/login')
  logIn(@Body(ValidationPipe) authDto: AuthDto): Promise<{accessToken: string}> {
    return this.authService.login(authDto);
  }

//   @Post('/test')
//   @UseGuards(AuthGuard())
//   test(@GetUser() user: User) { // 커스텀 데코레이터
//     console.log(user);
// }
}