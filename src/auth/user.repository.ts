import { EntityRepository, Repository } from "typeorm";
import { AuthDto } from "./dto/auth.dto";
import { User } from "./entities/user.entity";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";


@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authDto: AuthDto): Promise<void> {
        const {addressId, countNFT} = authDto;

        // const salt = await bcrypt.genSalt();
        // const hashedCountNFT = await bcrypt.hash(countNFT, salt);
        //try {
        const user = this.create({ addressId, countNFT });
        await this.save(user);
        
            
        // } catch(error) {
        //     if(error.code === '23505') {
        //         throw new ConflictException("Existing address");
        //     } else {
        //         throw new InternalServerErrorException();
        //     }
        // }
    }

}