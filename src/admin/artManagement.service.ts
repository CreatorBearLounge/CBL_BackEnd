import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtManagementRepository } from './artManagement.repository';
import { ArtistRepository } from './artist.repository';
import { ArtManagementDto } from './dto/artManagement.dto';
import { Art } from './entities/artManagement.entity';
import { Artist } from './entities/artist.entity';
import { ArtistDto } from './dto/artist.dto';
import { CategoryRepository } from './category.repository';
import { CategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class ArtManagementService {
    constructor(
        @InjectRepository(ArtManagementRepository)
        @InjectRepository(ArtistRepository)
        @InjectRepository(CategoryRepository)
        private artManagementRepository: ArtManagementRepository,
        private artistRepository: ArtistRepository,
        private categoryRepository: CategoryRepository,
    ) { }

    // 작품 리스트 조회
    async getArts(): Promise<Art[]> {
        return await this.artManagementRepository.find();
    }

    // 작품 업로드
    async uploadArt(artManagementDto: ArtManagementDto): Promise<Art> {
        return this.artManagementRepository.uploadArt(artManagementDto);
    }

    // 개별 작품 조회
    async getArtById(id: number): Promise<Art> {

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
    async getArtist(): Promise<Artist[]> {
        return await this.artistRepository.find();
    }

    // 작가 업로드
    async uploadArtist(artistDto: ArtistDto): Promise<Artist> {
        return this.artistRepository.uploadArtist(artistDto);
    }

    // 카테고리 업로드
    async uploadCategory(categoryDto: CategoryDto): Promise<Category> {
        return this.categoryRepository.uploadCategory(categoryDto);
    }


    // 작품 상세 조회 (작품 내용 + 작가 프로필 + 작가의 작품)
    async getArtDetail(id: number): Promise<any> {

        this.artManagementRepository.viewCount(id); // 개별 작품 조회시 마다 조회수 1 증가

        const art = await this.artManagementRepository.findOne(id); // 작품

        if (!art) {
            throw new NotFoundException(`Cant't find art with id ${id}`);
        }


        const artist = await this.artistRepository.findOne(art.artist); // 작가

        let artistsArts = await this.artManagementRepository.find({ // 작가의 전체 작품
            where: [
                { artist: art.artist }
            ]
        });

        let filteredArts = artistsArts.filter((element) => element.id != id); // 현재 작품 제외한 작품들

        return [art, artist, filteredArts];
    }
}
