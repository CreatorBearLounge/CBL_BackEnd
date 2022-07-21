import { EntityRepository, Repository } from "typeorm";
import { ArtManagementDto } from "./dto/artManagement.dto";
import { Art } from "./entities/artManagement.entity";

@EntityRepository(Art)
export class ArtManagementRepository extends Repository<Art>
{

    // 작품 업로드
    async uploadArt(artManagementDto: ArtManagementDto, url: string): Promise<Art> {
        try {
            console.log('ArtManagementRepository-uploadArt-start');
            const thumbnail = url;
            const viewCount = 0;
            const downloadCount = 0;
            
        const {title, categoryId, artistId, date, description, downloadUrl}  = artManagementDto;

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
    async updateArt(id: number, newArt: ArtManagementDto): Promise<Art> {
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

    async getArtById(id: number): Promise<any> {
        const artId = (await this.findOne(id)).id;
        const title = (await this.findOne(id)).title;
        const categoryId = (await this.findOne(id)).categoryId;
        const artistId = (await this.findOne(id)).artistId;
 

        
        const date = (await this.findOne(id)).date;
        const description = (await this.findOne(id)).description;
        const viewCount = (await this.findOne(id)).viewCount;
        const downloadCount = (await this.findOne(id)).downloadCount;
        const downloadUserId = (await this.findOne(id)).downloadUserId;
        const thumbnail = (await this.findOne(id)).thumbnail;
        const downloadUrl = (await this.findOne(id)).downloadUrl;

        return {artId, title, categoryId, artistId, date, description, viewCount, downloadCount, downloadUserId, thumbnail, downloadUrl};
    }

    // 개별 작품 조회시 마다 조회수 1 증가
    async viewCount(id: number) {
        const artToUpdate = await this.findOne(id);
        artToUpdate.viewCount += 1;

        await this.save(artToUpdate);

        return artToUpdate;
    }
}