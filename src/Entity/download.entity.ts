import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/entities/user.entity";
import { Art } from "src/Entity/art.entity";

@Entity("Download")
export class Download extends BaseEntity {

    @ApiProperty({description: "다운로드 pk 값"})
    @PrimaryGeneratedColumn() 
    readonly id: number;

    @ManyToOne(type => Art, {eager: false}) // N:1 relationship
    art: Art;

    @ManyToOne(type => User, (user) => user.download, {nullable: true, eager: true})// N:1 relationship
    user: User; // 유저 컬럼
}