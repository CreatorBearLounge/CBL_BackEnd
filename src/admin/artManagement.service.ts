import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtManagementRepository } from './artManagement.repository';
import { ArtistRepository } from './artist.repository';
import { ArtManagementDto } from './dto/artManagement.dto';
import { Art } from './entities/artManagement.entity';
import { Artist } from './entities/artist.entity';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtManagementService {
    constructor(
        @InjectRepository(ArtManagementRepository)
        @InjectRepository(ArtistRepository)
        private artManagementRepository: ArtManagementRepository,
        private artistRepository: ArtistRepository,
    ){}

    // 작품 리스트 조회
    async getArts(): Promise <Art[]> {
        return await this.artManagementRepository.find();
    }

    // 작품 업로드
    async uploadArt(artManagementDto: ArtManagementDto): Promise<Art> {
        return this.artManagementRepository.uploadArt(artManagementDto);
    }

    // 개별 작품 조회
    async getArtById(id: number): Promise <Art> {
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
