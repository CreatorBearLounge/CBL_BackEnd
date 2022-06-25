import { Injectable } from '@nestjs/common';
import { Art } from 'src/admin/entities/artManagement.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ArtManagementRepository } from 'src/admin/artManagement.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistRepository } from 'src/admin/artist.repository';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ArtManagementRepository)
    @InjectRepository(ArtistRepository)
    private artManagementRepository: ArtManagementRepository,
    private artistRepository: ArtistRepository,
  ) {}

  // 카테고리 또는 작가 별 작품 리스트 가져오기
  async findArtsByCategoryOrAtrist(id: string): Promise<Art[]> {
    return await this.artManagementRepository.find({
      where: [
        {category: id}, {artist: id}
      ]
    });
  }
}
