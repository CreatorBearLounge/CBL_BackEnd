import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/Entity/artist.entity';
import { ArtistDto } from '../../DTO/artist.dto';
import * as AWS from 'aws-sdk';
import { S3Repository } from '../../Repository/s3.repository';
import { S3 } from 'src/Entity/s3.entity';
import { CategoryRepository } from '../../Repository/category.repository';
import { Category } from 'src/Entity/category.entity';
import { Art } from 'src/Entity/art.entity';
import { ArtRepository } from 'src/Repository/art.repository';
import { ArtistRepository } from 'src/Repository/artist.repository';
import { ArtDto } from 'src/DTO/art.dto';
import { CategoryDto } from 'src/DTO/category.dto';



AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS,
    region: process.env.AWS_REGION
  });
  
@Injectable()
export class ArtManagementService {
    constructor(
        @InjectRepository(ArtRepository)
        @InjectRepository(ArtistRepository)
        @InjectRepository(CategoryRepository)
        @InjectRepository(S3Repository)
        
        private artRepository: ArtRepository,
        private artistRepository: ArtistRepository,
         private categoryRepository: CategoryRepository,
        private s3Repository: S3Repository,
    ){}

    /*
    1. getArts: 작품 리스트 조회
    2. uploadArt: 작품 업로드
    3. getArtById: 아이디로 작품 찾기 - 작품 상세 조회
    */

    // 작품 리스트 조회
    async getArts(): Promise<Art[]> {
        return await this.artRepository.find();
    }

    // 작품 업로드
    /**
     * JSDOC
     * @Param location image url
     * @Author 현빈짱
     * @Return art
     */
    async uploadArt(artDto: ArtDto, files: Express.Multer.File[], location: string): Promise<Art> {
        console.log('ArtManagementService-uploadArt-start');
        try{
            const uploadFiles = [];
        for(const element of files) {
        const file = new S3();
        file.originalName = element.originalname;
        uploadFiles.push(file);
        }
        console.log(uploadFiles);

        await this.s3Repository.save(uploadFiles);
        const url = (location);
        console.log({url});
        
        return this.artRepository.uploadArt(artDto, url);
        }
        catch(error) {
        throw new BadRequestException(error.message);
        } finally {
            console.log('ArtManagementService-uploadArt-end');
        }
    }

    // 개별 작품 조회
    async getArtById(id: number): Promise<Art> {

        this.artRepository.viewCount(id); // 개별 작품 조회시 마다 조회수 1 증가
        const found = await this.artRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Cant't find art with id ${id}`);
        }

        return found;
    }

    // 작품 수정
    async updateArt(id: number, newArt: ArtDto): Promise<Art> {
        return this.artRepository.updateArt(id, newArt);
    }

    // 작품 삭제
    async deleteArt(id: number): Promise<void> {
        const result = await this.artRepository.delete(id);
        console.log(result);
    }


    // 작가 리스트 조회
    async getArtist(): Promise<Artist[]> {
        return await this.artistRepository.find();
    }

    // 작가 업로드 - s3 적용 (profile)
    async uploadArtist(artistDto: ArtistDto, files: Express.Multer.File[], location: string): Promise<Artist> {
        try{
            const uploadFiles = [];
        for(const element of files) {
        const file = new S3();
        file.originalName = element.originalname;
        uploadFiles.push(file);
        }
        console.log(uploadFiles);

        await this.s3Repository.save(uploadFiles);
        const url = (location);
        console.log({url});
        
        return this.artistRepository.uploadArtist(artistDto, url);
        }
        catch(error) {
        throw new BadRequestException(error.message);
        } finally {
            console.log('ArtManagementService-uploadArt-end');
        }
    }

    // 카테고리 업로드
    async uploadCategory(categoryDto: CategoryDto): Promise<Category> {
        return this.categoryRepository.uploadCategory(categoryDto);
    }


    // 작품 상세 조회 (작품 내용 + 작가 프로필 + 작가의 작품)
    async getArtDetail(id: number): Promise<any> {

        this.artRepository.viewCount(id); // 개별 작품 조회시 마다 조회수 1 증가

        const art = await this.artRepository.findOne(id); // 작품
        if (!art) {
            throw new NotFoundException(`Cant't find art with id ${id}`);
        }

        const artist = await this.artistRepository.findOne(art.artistId); // 작가
        let artistsArts = await this.artRepository.find({ // 작가의 전체 작품
            where: [
                { artistId: art.artistId }
            ]
        });

        let filteredArts = artistsArts.filter((element) => element.id != id); // 현재 작품 제외한 작품들

        return [art, artist, filteredArts];
    }
}
