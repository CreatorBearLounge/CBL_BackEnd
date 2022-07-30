import { EntityRepository, Repository } from "typeorm";
import { Art } from "src/Entity/art.entity";
import { ArtDto } from "src/DTO/art.dto";

@EntityRepository(Art)
export class ArtRepository extends Repository<Art> {

    // 작품 업로드
    async uploadArt(artDto: ArtDto, url: string): Promise<Art> {
        try {
            console.log('ArtManagementRepository-uploadArt-start');
            const thumbnail = url;
            const viewCount = 0;
            const downloadCount = 0;
            
        const {title, categoryId, artistId, date, description, downloadUrl}  = artDto;

        const art = this.create({
            title,
            categoryId, 
            artistId,
            date,
            description,
            thumbnail,
            viewCount,
            downloadCount,
            downloadUrl
        })

        return this.save(art);
        } catch(err) {
            console.log('ArtManagementRepository-uploadArt-err');
            throw err;
        } finally {
            console.log('ArtManagementRepository-uploadArt-end');
        }
        
    }

    // 작품 수정
    async updateArt(id: number, newArt: ArtDto): Promise<Art> {
        const artToUpdate = await this.findOne(id);
        artToUpdate.title = newArt.title;
        artToUpdate.categoryId = newArt.categoryId;
        artToUpdate.artistId = newArt.artistId;
        artToUpdate.date = newArt.date;
        artToUpdate.description = newArt.description;
        // artToUpdate.thumbnail = newArt.thumbnail;

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