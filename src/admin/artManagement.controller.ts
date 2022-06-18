import { Controller, Get, Param, Post, Delete, Patch, Body } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { ArtManagementService } from './artManagement.service';
import { ArtManagementDto } from './dto/artManagement.dto';
import { Art } from './entities/artManagement.entity';

@Controller('admin')
export class ArtManagementController {
    constructor(private artManagementService: ArtManagementService) {}

    // 작품 관리 메인 페이지 - 전체 작품 리스트 조회
    @Get('/files')
    getList(): string {
        return this.artManagementService.getList();
    }

    // 작품 업로드 페이지
    @Post('/files/upload')
    @FormDataRequest()
    uploadArt(@Body() artManagementDto: ArtManagementDto): Promise<Art> {
        // const upload,  = {}
        return this.artManagementService.uploadArt(artManagementDto);
    }

    // 작품 상세 페이지
    @Get('/files/:id')
    getArtById(@Param('id') id: number): Promise<Art> {
        return this.artManagementService.getArtById(id);
    }

    // 작품 수정
    @Patch('/files/:id')
    updateFile(@Param('id') id: number): string {
        return this.artManagementService.updateFile(id);
    }

    // 작품 삭제
    @Delete('/files/:id')
    deleteFile(@Param('id') id: number): string {
        return this.artManagementService.deleteFile(id);
    }
    
}
