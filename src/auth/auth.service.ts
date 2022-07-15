import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dto/auth.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService, // jwt 사용위해 주입
) {}

    async login(authDto: AuthDto): Promise<any> {//Promise<{accessToken: string}> {
      const {addressId, countNFT} = authDto;
      const user = await this.userRepository.findOne({addressId});
     
      if (!user)
      {
        this.userRepository.createUser(authDto);
      }
      
      const payload = { addressId };
      const accessToken = await this.jwtService.sign(payload);
      return {accessToken, user};
          
    }
}