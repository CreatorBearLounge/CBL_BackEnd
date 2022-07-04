import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtManagementRepository } from '../artManagement.repository';
import { CategoryRepository } from '../category.repository';

@Injectable()
export class DistributionService {
    constructor(
        @InjectRepository(ArtManagementRepository)
        @InjectRepository(CategoryRepository)
        private artManagementRepository: ArtManagementRepository,
        private categoryRepository: CategoryRepository,
    ) { }

    // 작가 별 분배포인트 계산
    async calculateDistribution(id: number): Promise<number> {
        const list = await this.artManagementRepository.find({
            where: [
                { artistId: id }
            ]
        }); // 작가명이 id인 사람의 작품들 배열 ==> 여기서 카테고리 명만 빼서 배열에 저장하자. 카테고리 명에 따른 분배 포인트들의 합 구하기.

        const categoryArray = []; // 카테고리 id들 저장되어 있음
        list.forEach((element) => {
            categoryArray.push(element.categoryId);
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
