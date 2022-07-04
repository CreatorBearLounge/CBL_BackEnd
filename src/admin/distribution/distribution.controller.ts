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
    calculateDistribution(): Promise<number[]> {
        return this.distributionService.calculateDistributionAll();
    }
}
