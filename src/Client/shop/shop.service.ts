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
        { category: id }
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
        { artist: id }
      ]
    });

    return [artist, artList];
  }

  // 작가 별 작품 리스트 가져오기 (+ 작가 프로필)
  async findArtsByArtist2(id: number): Promise<Art[]> {
    return await this.artManagementRepository.find({
      where: [
        { artist: id }
      ]
    });
  }

  // 작가 별 분배포인트 계산
  async calculateDistribution(id: number): Promise<number> {
    const list = await this.artManagementRepository.find({
      where: [
        { artist: id }
      ]
    }); // 작가명이 id인 사람의 작품들 배열 ==> 여기서 카테고리 명만 빼서 배열에 저장하자. 카테고리 명에 따른 분배 포인트들의 합 구하기.

    const categoryArray = []; // 카테고리 id들 저장되어 있음
    list.forEach((element) => {
      categoryArray.push(element.category);
    })

    console.log(categoryArray); // [1,2,3]

    let categoryList = [];

    for (let i = 0; i < 3; i++) {
      categoryList.push(await this.categoryRepository.find({
        where: [{ id: categoryArray[i] }]
      })
      )
    }

    let downloadDistributionSum = 0;

    categoryList.forEach((element) => {
      console.log(element[0].downloadDistribution);
      downloadDistributionSum += element[0].downloadDistribution;
    })

    return downloadDistributionSum;
  }
}