import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Art } from 'src/admin/entities/artManagement.entity';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  // 카테고리 또는 작가 별 작품 리스트 가져오기
  @Get(':id')
  @ApiOperation({ summary: '카테고리 또는 작가 별 작품 리스트 가져오는 API', description: '카테고리 또는 작가 별 작품 리스트 가져오기' })
  @ApiCreatedResponse({ description: '카테고리 또는 작가 별 작품 리스트 가져오기' })

  findArtsByCategoryOrAtrist(@Param('id') id: string): Promise<Art[]> {
    return this.shopService.findArtsByCategoryOrAtrist(id);
  }
}