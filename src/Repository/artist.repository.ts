import { EntityRepository, Repository } from "typeorm";
import { Artist } from "src/Entity/artist.entity";
import { ArtistDto } from "src/DTO/artist.dto";

@EntityRepository(Artist)
export class ArtistRepository extends Repository<Artist> {

    // 작가 업로드 s3
    async uploadArtist(artistDto: ArtistDto, url: string): Promise<Artist> {

        try {
            const profile = url;


            const { name, description, resume } = artistDto;

            const artist = this.create({
                name,
                description,
                resume,
                profile
            })

            await this.save(artist);

            return artist;
        } catch(err) {
            console.log(err);
        }
    }
}