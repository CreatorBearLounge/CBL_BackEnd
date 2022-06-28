import { Injectable } from '@nestjs/common';
import { Art } from 'src/admin/entities/artManagement.entity';
import { ArtManagementRepository } from 'src/admin/artManagement.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/admin/category.repository';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ArtManagementRepository)
    @InjectRepository(CategoryRepository)
    private artManagementRepository: ArtManagementRepository,
    private categoryRepository: CategoryRepository,
  ) { }

  // 카테고리 또는 작가 별 작품 리스트 가져오기
  async findArtsByCategoryOrArtist(id: string): Promise<Art[]> {
    return await this.artManagementRepository.find({
      where: [
        { category: id }, { artist: id }
      ]
    });
  }

  // 카테고리 별 작품 리스트 가져오기
  async findArtsByCategory(id: number): Promise<Art[]> {
    return await this.artManagementRepository.find({
      where: [
        { category: id }
      ]
    });
  }

  // 작가 별 작품 리스트 가져오기
  async findArtsByArtist(id: number): Promise<Art[]> {
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