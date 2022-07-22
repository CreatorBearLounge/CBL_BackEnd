import { Controller, Get, Param, Post, Delete, Patch, Body, UploadedFiles, Req, Res, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse, ApiExcludeController, ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { ArtManagementService } from './artManagement.service';
import { ArtistDto } from './dto/artist.dto';
import { CategoryDto } from './dto/category.dto';
import { ArtManagementDto } from './dto/artManagement.dto';
import { Art } from './entities/artManagement.entity';
import { Artist } from './entities/artist.entity';
import { Category } from './entities/category.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import 'dotenv/config';
import { DistributionService } from './distribution/distribution.service';

const s3 = new AWS.S3();
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS,
    region: process.env.AWS_REGION
  });

@ApiTags('admin')
@Controller('admin')
export class ArtManagementController {
    constructor(
        private artManagementService: ArtManagementService,
        private distributionService: DistributionService,
        ) {}


    // 작품 관리 메인 페이지 - 전체 작품 리스트 조회
    @Get('/arts')
    @ApiOperation({ summary: '전체 작품 리스트 조회 API', description: '전체 작품 리스트 조회' }) // 요청 URL 에 매핑된 API 에 대한 설명
    @ApiCreatedResponse({ description: '전체 작품 리스트 조회', type: Art }) // API 응답에 대한 정의
    async getList(): Promise <Art[]> {
        return this.artManagementService.getArts();
    }

    // 작품 업로드 페이지
    @ApiExcludeEndpoint()
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
    @ApiExcludeEndpoint()
    @Get('/arts/:id')
    @ApiOperation({ summary: '개별 작품 조회 API', description: '개별 작품 조회 admin/arts/1' })
    @ApiCreatedResponse({ description: '** 반환값에 "artistName": "name1" 속성 포함', type: Art })
    getArtById(@Param('id') id: number): Promise<any> {
        return this.artManagementService.getArtById(id);
    }

    // 작품 수정
    @ApiExcludeEndpoint()
    @Patch('/arts/:id')
    @FormDataRequest()
    updateArt(@Param('id') id: number, @Body() artManagementDto: ArtManagementDto): Promise<Art> {
        return this.artManagementService.updateArt(id, artManagementDto);
    }

    // 작품 삭제
    @ApiExcludeEndpoint()
    @Delete('/arts/:id')
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

    // 작가 업로드 - s3 버킷
    @ApiExcludeEndpoint()
    @Post('/artist/upload')
    @ApiOperation({ summary: '작가 업로드 API', description: '작가 업로드' })
    @ApiCreatedResponse({ description: '작가 업로드', type: Artist })
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
    async uploadArtist(@Body() artistDto: ArtistDto, @UploadedFiles() files: Express.Multer.File[], @Req() request, @Res() response) {
        const { location } = request.files[0];
        const uploadedArt = await this.artManagementService.uploadArtist(artistDto, files, location);
        response.send(uploadedArt);
    }

    // 카테고리 업로드 
    @ApiExcludeEndpoint()
    @Post('/category/upload')
    @ApiOperation({ summary: '카테고리 업로드 API', description: '카테고리 업로드' })
    @ApiCreatedResponse({ description: '카테고리 업로드', type: Category })
    @FormDataRequest()
    uploadCategory(@Body() categoryDto: CategoryDto): Promise<Category> {
        return this.artManagementService.uploadCategory(categoryDto);
    }
}
