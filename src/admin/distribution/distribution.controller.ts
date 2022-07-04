import { Controller, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';
import { DistributionService } from './distribution.service';

@Controller('distribution')
export class DistributionController {
    constructor(private readonly distributionService: DistributionService) { }
    // 작가 별 분배포인트 계산
    @Get()
    @ApiOperation({ summary: '작가 별 분배포인트 계산 API', description: '작가 별 분배포인트 계산' })
    @ApiCreatedResponse({ description: '작가 별 분배포인트 계산', type: Category })
    calculateDistributionAll(): Promise<number[]> {
        return this.distributionService.calculateDistributionAll();
    }

    // 작가 한명 분배포인트 계산 테스트
    @Get('/:id')
    calculateDistribution(@Param('id') id: number): Promise<number> {
        return this.distributionService.calculateDistribution(id);
    }
}
