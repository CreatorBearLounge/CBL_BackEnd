import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistRepository } from '../artist.repository';
import { ArtManagementRepository } from '../artManagement.repository';
import { CategoryRepository } from '../category.repository';

@Injectable()
export class DistributionService {
    constructor(
        @InjectRepository(ArtManagementRepository)
        @InjectRepository(CategoryRepository)
        @InjectRepository(ArtistRepository)
        private artManagementRepository: ArtManagementRepository,
        private categoryRepository: CategoryRepository,
        private artistRepository: ArtistRepository,
    ) { }

    // 작가 별 분배포인트 계산 (한명)
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

        //console.log(categoryArray); // [1,2,3]

        let categoryList = [];

        for (let i = 0; i < categoryArray.length; i++) {
            categoryList.push(await this.categoryRepository.find({
                where: [{ id: categoryArray[i] }]
            })
            )
        }

        let downloadDistributionSum = 0;

        categoryList.forEach((element) => {
            //console.log(element[0].downloadDistribution);
            downloadDistributionSum += element[0].downloadDistribution;
        })

        return downloadDistributionSum;
        //console.log(downloadDistributionSum);
    }

    async calculateDistributionAll(): Promise<number[]> {
        const artistIdArray = await this.artistRepository.find({select: ["id"]});
        const idArray = []; // 등록된 작가의 id들
        for (const i of artistIdArray) {
            idArray.push(i.id);
        }

        const calculatedPoint = []; // 작가별 포인트
        for (const i of idArray) {
            calculatedPoint.push(await this.calculateDistribution(parseInt(i)));
        }
        console.log(calculatedPoint);

        const pointSum = calculatedPoint.reduce((sum, currVal) => { // 전체 포인트 합
            return sum + currVal;
        }, 0);

        console.log(pointSum);

        for (let i in calculatedPoint) {
            calculatedPoint[i] /= pointSum;
        }

        return calculatedPoint; // 각 작가별 계산된 포인트
    }
}