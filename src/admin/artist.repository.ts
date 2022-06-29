import { EntityRepository, Repository } from "typeorm";
import { ArtistDto } from "./dto/artist.dto";
import { Artist } from "./entities/artist.entity";

@EntityRepository(Artist)
export class ArtistRepository extends Repository<Artist> {

    // 작가 업로드

    async uploadArt(artistDto: ArtistDto): Promise<Artist> {
        const {name, description, resume} = artistDto;

    async uploadArtist(artistDto: ArtistDto): Promise<Artist> {
        const {name, description, resume, thumbnail} = artistDto;

        const artist = this.create({
            name,
            description,
            resume,
        })

        await this.save(artist);

        return artist;
    }
}