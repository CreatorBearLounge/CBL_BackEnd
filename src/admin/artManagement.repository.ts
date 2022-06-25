import { EntityRepository, Repository } from "typeorm";
import { ArtManagementDto } from "./dto/artManagement.dto";
import { Art } from "./entities/artManagement.entity";

@EntityRepository(Art)
export class ArtManagementRepository extends Repository<Art> {

    // 작품 업로드
    async uploadArt(artManagementDto: ArtManagementDto): Promise<Art> {
        const {title, category, artist, date, description, thumbnail} = artManagementDto;

        const art = this.create({
            title,
            category, 
            artist,
            date,
            description,
            thumbnail
        })

        await this.save(art);

        return art;
    }

    // 작품 수정
    async updateArt(id: number, newArt: ArtManagementDto): Promise<Art> {
        const artToUpdate = await this.findOne(id);
        artToUpdate.title = newArt.title;
        artToUpdate.category = newArt.category;
        artToUpdate.artist = newArt.artist;
        artToUpdate.date = newArt.date;
        artToUpdate.description = newArt.description;
        artToUpdate.thumbnail = newArt.thumbnail;

        await this.save(artToUpdate);

        return artToUpdate;

    }

     // 개별 작품 조회시 마다 조회수 1 증가
    async viewCount(id: number) {
        const artToUpdate = await this.findOne(id);
        artToUpdate.viewCount += 1;

        await this.save(artToUpdate);

        return artToUpdate;
    }
}