import { Controller, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { DistributionService } from './distribution.service';

@Controller('distribution')
export class DistributionController {
    constructor(private readonly distributionService: DistributionService) { }

    // // 카테고리 또는 작가 별 작품 리스트 가져오기
    // @Get(':id')
    // @ApiOperation({ summary: '카테고리 또는 작가 별 작품 리스트 가져오는 API', description: '카테고리 또는 작가 별 작품 리스트 가져오기' })
    // @ApiCreatedResponse({ description: '카테고리 또는 작가 별 작품 리스트 가져오기' })

    // calculateDistribution(@Param('id') id: string): Promise<void> {
        
    // }

}
