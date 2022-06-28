import { BadRequestException, Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtManagementRepository } from './artManagement.repository';
import { ArtistRepository } from './artist.repository';
import { ArtManagementDto } from './dto/artManagement.dto';
import { Art } from './entities/artManagement.entity';
import { Artist } from './entities/artist.entity';
import { ArtistDto } from './dto/artist.dto';
import { S3Service } from 'src/s3/s3.service';
import * as AWS from 'aws-sdk';
import { S3 } from 'src/s3/entities/s3.entity';
import { S3Repository } from './s3.repository';


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
    async uploadArt(artManagementDto: ArtManagementDto, files: Express.Multer.File[],@Req() request, @Res() response): Promise<Art> {
        
        const uploadFiles = [];
        for(const element of files) {
        const file = new S3();
        file.originalName = element.originalname;
        uploadFiles.push(file);
        }
        console.log(uploadFiles);
        
        try{
        this.s3Repository.save(uploadFiles);
        console.log(typeof(request.files[0].location));
        // return response.json(request.files[0].location);
        const url = (request.files[0].location);
        // const url = response.json(request.files[0].location);
        
        return this.artManagementRepository.uploadArt(artManagementDto, url);
        }
        catch(error) {
        throw new BadRequestException(error.message);
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
