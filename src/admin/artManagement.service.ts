import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtManagementRepository } from './artManagement.repository';
import { ArtManagementDto } from './dto/artManagement.dto';
import { Art } from './entities/artManagement.entity';

@Injectable()
export class ArtManagementService {
    constructor(
        @InjectRepository(ArtManagementRepository)
        private artManagementRepository: ArtManagementRepository,
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
    updateFile(id: number) {
        return `update file #${id}.`;
    }

    // 작품 삭제
    deleteFile(id: number) {
        return `delete file #${id}.`;
    }
}
