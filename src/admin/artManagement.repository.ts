import { EntityRepository, Repository } from "typeorm";
import { ArtManagementDto } from "./dto/artManagement.dto";
import { Art } from "./entities/artManagement.entity";

@EntityRepository(Art)
export class ArtManagementRepository extends Repository<Art> {
    async createBoard(artManagementDto: ArtManagementDto): Promise<Art> {
        const {title, category, artist, date, description} = artManagementDto;

        const board = this.create({
            title,
            category, 
            artist,
            description,
        })

        await this.save(board); // db에 저장. typeorm 메소드
        return board;
    };
}