import { EntityRepository, Repository } from "typeorm";
import { ArtManagementDto } from "./dto/artManagement.dto";
import { Art } from "./entities/artManagement.entity";

@EntityRepository(Art)
export class ArtManagementRepository extends Repository<Art> {
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
}