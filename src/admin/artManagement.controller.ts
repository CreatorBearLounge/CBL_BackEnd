import { Controller, Get, Param, Post, Delete, Patch, Body, UploadedFiles, Req, Res, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { ArtManagementService } from './artManagement.service';
import { ArtistDto } from './dto/artist.dto';
import { ArtManagementDto } from './dto/artManagement.dto';
import { Art } from './entities/artManagement.entity';
import { Artist } from './entities/artist.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import 'dotenv/config';

const s3 = new AWS.S3();
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS,
    region: process.env.AWS_REGION
  });

@Controller('admin')
export class ArtManagementController {
    constructor(
        private artManagementService: ArtManagementService,
        //private shopService: ShopService,
        ) {}

    // 작품 관리 메인 페이지 - 전체 작품 리스트 조회
    @Get('/arts')
    @ApiOperation({ summary: '전체 작품 리스트 조회 API', description: '전체 작품 리스트 조회' }) // 요청 URL 에 매핑된 API 에 대한 설명
    @ApiCreatedResponse({ description: '전체 작품 리스트 조회', type: Art }) // API 응답에 대한 정의
    async getList(): Promise <Art[]> {
        return this.artManagementService.getArts();
    }

    // 작품 업로드 페이지
    @Post('/arts/upload')
    @ApiOperation({ summary: '작품 업로드 API', description: '작품 업로드' })
    @ApiCreatedResponse({ description: '작품 업로드', type: Art })
    @UseInterceptors(FilesInterceptor("file", 10, {
        storage: multerS3({
          s3: s3,
          bucket: process.env.AWS_S3_BUCKET_NAME,
          contentType: multerS3.AUTO_CONTENT_TYPE,
          accessKeyId: process.env.AWS_ACCESS_KEY,
          acl: 'public-read',
          key: function (req, file, cb) {
            cb(null, `${Date.now().toString()}-${file.originalname}`);
          }
        }),
      }))
    async uploadArt(@Body() artManagementDto: ArtManagementDto, @UploadedFiles() files: Express.Multer.File[], @Req() request, @Res() response) {
        console.log('ArtManagementController-uplaodArt-start');
        // const locations = request.files.locations;
        const { location } = request.files[0];
        const uploadedArt = await this.artManagementService.uploadArt(artManagementDto, files, location);
        console.log('ArtManagementController-uplaodArt-end');
        // console.log({test});
        response.send(uploadedArt); // 문제 생길 수 있음 
        // return test;
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
    @FormDataRequest()
    updateArt(@Param('id') id: number, @Body() artManagementDto: ArtManagementDto): Promise<Art> {
        return this.artManagementService.updateArt(id, artManagementDto);
    }

    // 작품 삭제
    @Delete('/arts/:id')
    @ApiOperation({ summary: '개별 작품 삭제 API', description: '개별 작품 삭제' })
    @ApiCreatedResponse({ description: '개별 작품 삭제', type: Art })
    deleteArt(@Param('id') id: number): Promise<void> {
        return this.artManagementService.deleteArt(id);
    }


    // 작가 리스트 조회
    @Get('/artists')
    @ApiOperation({ summary: '전체 작가 리스트 조회 API', description: '전체 작가 리스트 조회' }) // 요청 URL 에 매핑된 API 에 대한 설명
    @ApiCreatedResponse({ description: '전체 작가 리스트 조회', type: Artist }) // API 응답에 대한 정의
    getArtistList(): Promise <Artist[]> {
        return this.artManagementService.getArtist();
    }

    // 작가 업로드 
    @Post('/artist/upload')
    @ApiOperation({ summary: '작가 업로드 API', description: '작가 업로드' })
    @ApiCreatedResponse({ description: '작가 업로드', type: Artist })
    @FormDataRequest()
    uploadArtist(@Body() artistDto: ArtistDto): Promise<Artist> {
        return this.artManagementService.uploadArtist(artistDto);
    }
}
