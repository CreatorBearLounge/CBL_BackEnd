import { Injectable } from '@nestjs/common';
import { Art } from 'src/admin/entities/artManagement.entity';
import { ArtManagementRepository } from 'src/admin/artManagement.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/admin/category.repository';
import { ArtistRepository } from 'src/admin/artist.repository';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ArtManagementRepository)
    @InjectRepository(CategoryRepository)
    @InjectRepository(ArtistRepository)
    private artManagementRepository: ArtManagementRepository,
    private categoryRepository: CategoryRepository,
    private artistRepository: ArtistRepository,
  ) { }

  // 카테고리 별 작품 리스트 가져오기 (+ 카테고리 명, 카테고리 설명)
  async findArtsByCategory(id: number): Promise<any> {

    const category = await this.categoryRepository.find({
      where: { id: id }
    })

    const categoryName = category[0].name;
    const categoryDescription = category[0].description;

    const artList = await this.artManagementRepository.find({
      where: [
        { categoryId: id }
      ]
    });

    return [categoryName, categoryDescription, artList];
  }

  // 작가 별 작품 리스트 가져오기 (+ 작가 프로필)
  async findArtsByArtist(id: number): Promise<any> {
    const artist = await this.artistRepository.find({
      where: {id: id}
    })

    const artList = await this.artManagementRepository.find({
      where: [
        { artistId: id }
      ]
    });

    return [artist, artList];
  }

  // 작가 별 작품 리스트 가져오기 (+ 작가 프로필)
  async findArtsByArtist2(id: number): Promise<Art[]> {
    return await this.artManagementRepository.find({
      where: [
        { artistId: id }
      ]
    });
  }
}