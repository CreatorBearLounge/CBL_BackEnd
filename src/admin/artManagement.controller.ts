import { Controller, Get, Param, Post, Delete, Patch, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { ArtManagementService } from './artManagement.service';
import { ArtManagementDto } from './dto/artManagement.dto';
import { Art } from './entities/artManagement.entity';

@Controller('admin')
export class ArtManagementController {
    constructor(private artManagementService: ArtManagementService) {}

    // 작품 관리 메인 페이지 - 전체 작품 리스트 조회
    @Get('/arts')
    @ApiOperation({ summary: '전체 작품 리스트 조회 API', description: '전체 작품 리스트 조회' }) // 요청 URL 에 매핑된 API 에 대한 설명
    @ApiCreatedResponse({ description: '전체 작품 리스트 조회', type: Art }) // API 응답에 대한 정의
    getList(): Promise <Art[]> {
        return this.artManagementService.getArts();
    }

    // 작품 업로드 페이지
    @Post('/arts/upload')
    @ApiOperation({ summary: '작품 업로드 API', description: '작품 업로드' })
    @ApiCreatedResponse({ description: '작품 업로드', type: Art })
    @FormDataRequest()
    uploadArt(@Body() artManagementDto: ArtManagementDto): Promise<Art> {
        return this.artManagementService.uploadArt(artManagementDto);
    }

    // 작품 상세 페이지
    @Get('/arts/:id')
    @ApiOperation({ summary: '개별 작품 조회 API', description: '개별 작품 조회' })
    @ApiCreatedResponse({ description: '개별 작품 조회', type: Art })
    getArtById(@Param('id') id: number): Promise<Art> {
        return this.artManagementService.getArtById(id);
    }

    // 작품 수정
    @Patch('/arts/:id')
    @ApiOperation({ summary: '개별 작품 수정 API', description: '개별 작품 수정' })
    @ApiCreatedResponse({ description: '개별 작품 수정', type: Art })
    updateFile(@Param('id') id: number): string {
        return this.artManagementService.updateArt(id);
    }

    // 작품 삭제
    @Delete('/arts/:id')
    @ApiOperation({ summary: '개별 작품 삭제 API', description: '개별 작품 삭제' })
    @ApiCreatedResponse({ description: '개별 작품 삭제', type: Art })
    deleteFile(@Param('id') id: number): string {
        return this.artManagementService.deleteArt(id);
    }
    
}
