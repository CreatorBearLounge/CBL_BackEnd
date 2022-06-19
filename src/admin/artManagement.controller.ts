import { Controller, Get, Param, Post, Delete, Patch, Body } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { ArtManagementService } from './artManagement.service';
import { ArtManagementDto } from './dto/artManagement.dto';
import { Art } from './entities/artManagement.entity';

@Controller('admin')
export class ArtManagementController {
    constructor(private artManagementService: ArtManagementService) {}

    // 작품 관리 메인 페이지 - 전체 작품 리스트 조회
    @Get('/arts')
    getList(): Promise <Art[]> {
        return this.artManagementService.getArts();
    }

    // 작품 업로드 페이지
    @Post('/arts/upload')
    @FormDataRequest()
    uploadArt(@Body() artManagementDto: ArtManagementDto): Promise<Art> {
        return this.artManagementService.uploadArt(artManagementDto);
    }

    // 작품 상세 페이지
    @Get('/arts/:id')
    getArtById(@Param('id') id: number): Promise<Art> {
        return this.artManagementService.getArtById(id);
    }

    // 작품 수정
    @Patch('/arts/:id')
    updateFile(@Param('id') id: number): string {
        return this.artManagementService.updateArt(id);
    }

    // 작품 삭제
    @Delete('/arts/:id')
    deleteFile(@Param('id') id: number): string {
        return this.artManagementService.deleteArt(id);
    }
    
}
