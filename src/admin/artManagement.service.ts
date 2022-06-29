import { BadRequestException, Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtManagementRepository } from './artManagement.repository';
import { ArtistRepository } from './artist.repository';
import { ArtManagementDto } from './dto/artManagement.dto';
import { Art } from './entities/artManagement.entity';
import { Artist } from './entities/artist.entity';
import { ArtistDto } from './dto/artist.dto';
import * as AWS from 'aws-sdk';
import { S3Repository } from './s3.repository';
import { S3 } from './entities/s3.entity';


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS,
    region: process.env.AWS_REGION
  });
  
@Injectable()
export class ArtManagementService {
    constructor(
        @InjectRepository(ArtManagementRepository)
        @InjectRepository(ArtistRepository)
        @InjectRepository(S3Repository)
        
        private artManagementRepository: ArtManagementRepository,
        private artistRepository: ArtistRepository,
        private s3Repository: S3Repository,
    ){}

    // 작품 리스트 조회
    async getArts(): Promise <Art[]> {
        return await this.artManagementRepository.find();
    }

    // 작품 업로드
    /**
     * JSDOC
     * @Param location image url
     * @Author 현빈짱
     * @Return art
     */
    async uploadArt(artManagementDto: ArtManagementDto, files: Express.Multer.File[], location: string): Promise<Art> {
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
        
        return this.artManagementRepository.uploadArt(artManagementDto, url);
        }
        catch(error) {
        throw new BadRequestException(error.message);
        } finally {
            console.log('ArtManagementService-uploadArt-end');
        }
    }

    // 개별 작품 조회
    async getArtById(id: number): Promise <Art> {
        
        this.artManagementRepository.viewCount(id); // 개별 작품 조회시 마다 조회수 1 증가

        const found = await this.artManagementRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Cant't find art with id ${id}`);
        }

        return found;
    }

    // 작품 수정
    async updateArt(id: number, newArt: ArtManagementDto): Promise<Art> {
        return this.artManagementRepository.updateArt(id, newArt);
    }

    // 작품 삭제
    async deleteArt(id: number): Promise<void> {
        const result = await this.artManagementRepository.delete(id);
        console.log(result);
    }


    // 작가 리스트 조회
    async getArtist(): Promise <Artist[]> {
        return await this.artistRepository.find();
    }

    // 작가 업로드
    async uploadArtist(artistDto: ArtistDto): Promise<Artist> {
        return this.artistRepository.uploadArt(artistDto);
    }
}
