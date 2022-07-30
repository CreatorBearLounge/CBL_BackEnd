import { Controller, Get, Param } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Art } from 'src/Entity/art.entity';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArtManagementService } from 'src/admin/artManagement/artManagement.service';

@ApiTags('shop')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  // 작가 별 작품 리스트 가져오기 (+ 작가 프로필)
  @Get('/artist/:id')
  @ApiOperation({ summary: '작가 별 작품 리스트 가져오는 API', description: '작가 별 작품 리스트 가져오기' })
  @ApiCreatedResponse({ description: '작가 별 작품 리스트 가져오기' })

  findArtsByArtist(@Param('id') id: number): Promise<any> {
    return this.shopService.findArtsByArtist(id);
  }

  // 카테고리 별 작품 리스트 가져오기 (+ 카테고리 명, 카테고리 설명)
  @Get('/category/:id')
  @ApiOperation({ summary: '카테고리 별 작품 리스트 가져오는 API', description: '카테고리 별 작품 리스트 가져오기' })
  @ApiCreatedResponse({ description: '카테고리 별 작품 리스트 가져오기 (+ 카테고리 명, 카테고리 설명)' })

  findArtsByCategory(@Param('id') id: number): Promise<any> {
    return this.shopService.findArtsByCategory(id);
  }

  // 개별 작품 조회
  @Get('/arts/:id')
  @ApiOperation({ summary: '개별 작품 조회 API', description: '개별 작품 조회' })
  @ApiCreatedResponse({ description: '개별 작품 조회', type: Art })
  getArtById(@Param('id') id: number): Promise<Art> {
    return this.shopService.getArtById(id);
  }

  // 작품 상세 조회 (작품 내용 + 작가 프로필 + 작가의 작품)
  @Get('/arts/detail/:id')
  @ApiOperation({ summary: '작품 상세 조회 API', description: '작품 상세 조회 (작품 내용 + 작가 프로필 + 작가의 작품)' })
  @ApiCreatedResponse({ description: '작품 상세 조회 (작품 내용 + 작가 프로필 + 작가의 작품)' })
  getArtDetail(@Param('id') id: number): Promise<any> {
    return this.shopService.getArtDetail(id);
  }
}