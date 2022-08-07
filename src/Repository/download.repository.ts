import { User } from "src/auth/entities/user.entity";
import { Art } from "src/Entity/art.entity";
import { Download } from "src/Entity/download.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Download)
export class DownloadRepository extends Repository<Download> {

    async saveDownload(user: User, art: Art) {

        const downloadArt = {user: user, art: art};
        const result = this.create(downloadArt)
        return this.save(result);
    }
}