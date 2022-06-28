import { Controller, Get, Param } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Art } from 'src/admin/entities/artManagement.entity';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ArtManagementService } from 'src/admin/artManagement.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService, private readonly artManagementService: ArtManagementService) { }

  // 카테고리 또는 작가 별 작품 리스트 가져오기
  @Get(':id')
  @ApiOperation({ summary: '카테고리 또는 작가 별 작품 리스트 가져오는 API', description: '카테고리 또는 작가 별 작품 리스트 가져오기' })
  @ApiCreatedResponse({ description: '카테고리 또는 작가 별 작품 리스트 가져오기' })

  findArtsByCategoryOrAtrist(@Param('id') id: string): Promise<Art[]> {
    return this.shopService.findArtsByCategoryOrArtist(id);
  }

  // 카테고리 별 작품 리스트 가져오기
  @Get('/category/:id')
  @ApiOperation({ summary: '카테고리 또는 작가 별 작품 리스트 가져오는 API', description: '카테고리 또는 작가 별 작품 리스트 가져오기' })
  @ApiCreatedResponse({ description: '카테고리 또는 작가 별 작품 리스트 가져오기' })

  findArtsByArtist(@Param('id') id: number): Promise<Art[]> {
    return this.shopService.findArtsByArtist(id);
  }

  // 카테고리 별 작품 리스트 가져오기
  @Get('/category/:id')
  @ApiOperation({ summary: '카테고리 또는 작가 별 작품 리스트 가져오는 API', description: '카테고리 또는 작가 별 작품 리스트 가져오기' })
  @ApiCreatedResponse({ description: '카테고리 또는 작가 별 작품 리스트 가져오기' })

  findArtsByCategory(@Param('id') id: number): Promise<Art[]> {
    return this.shopService.findArtsByCategory(id);
  }

  // 작품 상세 페이지
  @Get('/arts/:id')
  @ApiOperation({ summary: '개별 작품 조회 API', description: '개별 작품 조회' })
  @ApiCreatedResponse({ description: '개별 작품 조회', type: Art })
  getArtById(@Param('id') id: number): Promise<Art> {
      return this.artManagementService.getArtById(id);
  }
}